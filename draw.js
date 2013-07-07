var x, y, x1, x2, y1, y2, dx, dx, xs, ys, xAxis, yAxis, left, top, xmultiply, ymultiply; //Define all the stupid variables - perhaps narrow these down.
maxX=500;
maxY=300;
$("#maxX").on("keyup change", function(){ //Max x axis manual input
    maxX = this.value;
});
$("#maxY").on("keyup change", function(){ //Max y axis manual input
    maxY = this.value;
});

xAxis = 500; //Set our normal axes
yAxis = 300;

function clear() { //How to clear the entire thing
    $('span').remove('#label');
    $('div').remove('#xmark');
    $('div').remove('#ymark');
    $('div').remove('#line');
    $('div').remove('#point');
}

function clearPoints() { //How to clear just the data
    $('div').remove('#line');
    $('div').remove('#point');
}

function plotPoint(x, y) { //Plotting a point
	var point = $(document.createElement('div')).appendTo('#grid').attr('id', 'point'); //Create div #point appended to #grid
        point
			.css('left', x) //Left margin
			.css('top', y); //Top margin
}

function plotGuides(numberOfRows) {
    numberOfRows = (typeof numberOfRows == "undefined") ? 10 : numberOfRows;

	for (var i = 0;i<(numberOfRows+1);i++){
        var left = i*(xAxis/numberOfRows);
        var xsize = i*($('#grid').width() / numberOfRows); //Gives the margin left essentially
        var xLabel = $(document.createElement('span')).appendTo('#grid').attr('id', 'label').text(left.toFixed(1));
        var xMark = $(document.createElement('div')).appendTo('#grid').attr('id', 'xmark');
        xMark
            .css('left', xsize+'px');
        xLabel
            .css('position', 'absolute')
            .css('bottom', '-20px')
            .css('text-align', 'center')
            .css('left', -12+xsize+'px');
    }
    for (var i=0;i<(numberOfRows+1);i++){
        var top = i*(yAxis/numberOfRows);
        var ysize = i*($('#grid').height() / numberOfRows);
        var yLabel = $(document.createElement('span')).appendTo('#grid').attr('id', 'label').text(top.toFixed(1));
        var yMark = $(document.createElement('div')).appendTo('#grid').attr('id', 'ymark');
        yMark
            .css('top', 300-ysize+'px');
        yLabel
            .css('position', 'absolute')
            .css('left', '-52px')
            .css('top', 290-ysize+'px')
            .css('text-align', 'right');
    }
}

function plotLine() {
	var line = $(document.createElement('div')).attr('id', 'line').appendTo('#grid'); //Create the line
	var length = Math.sqrt(dx * dx + dy * dy); //Pythagorean theorum (a^2+b^2=c^2) so we know our hypotenuse length
	var angle = 180 / 3.1415 * Math.acos((y2 - y1) / length); //Figure out our angle by taking the inverse cos function (arccos). This is because arccos returns an angle based on the cos of an angle, where the inputs are the adjacent and the hypotenuse (dy and length).
	var yo = 300 - length; //This is our margin top
	if (x2 - x1 < 0) {
		angle *= -1; //Invert the angle to allow for negative trends
	}
	line
		.css('top', (yo - y1) + 'px') //Setting the top to be in the middle of the point in terms of y axis
		.css('left', x1 + 'px') //Setting the left margin to be the middle of the point in terms of x 
		.css('height', length)
		.css('-webkit-transform', 'rotate(' + angle + 'deg)')
		.css('-moz-transform', 'rotate(' + angle + 'deg)')
		.css('-o-transform', 'rotate(' + angle + 'deg)')
		.css('-ms-transform', 'rotate(' + angle + 'deg)')
		.css('transform', 'rotate(' + angle + 'deg)');
}

$(document).ready(function(){
    plotGuides();
});

$("#x").on("keyup change", function () { //Change everytime the text field is changed and/or a keypress
    xmultiply = 500/maxX; //Taking our x-axis multiplier from the width of the area in pixels and dividing it by our desired maximum number value.
    x = this.value*xmultiply-2 + 'px'; //Used to represent x value, just as a string
    xs = this.value; //Int x value
});
$("#y").on("keyup change", function () {
    ymultiply = 300/maxY; //Taking our y-axis multiplier from the height of the area in pixels and dividing it by our desired maximum number value.
    y = 298 - this.value*ymultiply + 'px'; //296 is just height of container- of the height of each individual point
    ys = this.value;
});

$('#plot').click(function () { //Happening everything you hit "Plot"
    if(xs<=maxX && ys<=maxY) {
        plotPoint(x, y);
        var pointAmount = $("#grid div").length; //See how many divs within #grid
        if (pointAmount > 2) { //If there are more than 2 points, then set our first set of numbers to be the old second set of numbers
            x1 = x2;
            y1 = y2;
       }
       if (pointAmount === 1) { //If there is only one point, set our first set of numbers to be the raw data
           x1 = xs*xmultiply;
            y1 = ys*ymultiply;
        } else { //Otherwise, set our second set of numbers to be the raw data
            x2 = xs*xmultiply;
            y2 = ys*ymultiply;
       }

       if (pointAmount > 1) { //If there is more than one point, draw a line
            dx = x2 - x1; //Used to make less calculations later on
            dy = y2 - y1; // ""
            plotLine();
        }

        $("#x, #y").val(""); // Clear input field values.
    } else {
        alert("Please enter a set of valid values!");
    }
});
$('#clear').click(function(){
    clearPoints();
});
$('#set').click(function(){
    clear();
    xAxis = maxX;
    yAxis = maxY;
    plotGuides();
    $("#maxX, #maxY").val(""); // Clear input field values.
});
