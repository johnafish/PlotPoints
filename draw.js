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
$(document).ready(function(){
    for (var i = 0;i<11;i++){ //Making horizontal lines and x axis labels
        left = i*(xAxis/10);//Because I want 10 lines
        var xLabel = $(document.createElement('span')).appendTo('#grid').attr('id', 'label').text(left.toFixed(1)); //Creating a label
        var xMark = $(document.createElement('div')).appendTo('#grid').attr('id', 'xmark'); //Creating a mark
        xMark
            .css('left', left+'px'); //Some styling to place them equally apart
        xLabel
            .css('position', 'absolute') //More styling to place equally
            .css('bottom', '-20px')
            .css('text-align', 'center')
            .css('left', -12+left+'px');
    }
    for (var i=0;i<11;i++){
        var top = i*(yAxis/10);
        var yLabel = $(document.createElement('span')).appendTo('#grid').attr('id', 'label').text(top.toFixed(1)); //Creating y
        var yMark = $(document.createElement('div')).appendTo('#grid').attr('id', 'ymark');
        yMark
            .css('top', 300-top+'px');
        yLabel
            .css('position', 'absolute')
            .css('left', '-52px')
            .css('top', 290-top+'px')
            .css('text-align', 'right');
    }
});
$("#x").on("keyup change", function () { //Change everytime the text field is changed and/or a keypress
    xmultiply = 500/maxX; //Taking our x-axis multiplier from the width of the area in pixels and dividing it by our desired maximum number value.
    x = this.value*xmultiply-2 + 'px'; //Used to represent x value, just as a string
    xs = this.value*xmultiply; //Int x value
});

$("#y").on("keyup change", function () {
    ymultiply = 300/maxY; //Taking our y-axis multiplier from the height of the area in pixels and dividing it by our desired maximum number value.
    y = 298 - this.value*ymultiply + 'px'; //296 is just height of container- of the height of each individual point
    ys = this.value*ymultiply;
});

$('#plot').click(function () { //Happening everything you hit "Plot"
    if(xs<=maxX && ys<=maxY) {
        var point = $(document.createElement('div')).appendTo('#grid').attr('id', 'point'); //Create div #point appended to #grid
        point.css('top', y) //Top margin
        .css('left', x); //Left margin
        var pointAmount = $("#grid div").length; //See how many divs within #grid
        if (pointAmount > 2) { //If there are more than 2 points, then set our first set of numbers to be the old second set of numbers
            x1 = x2;
            y1 = y2;
       }
       if (pointAmount === 1) { //If there is only one point, set our first set of numbers to be the raw data
           x1 = xs;
            y1 = ys;
        } else { //Otherwise, set our second set of numbers to be the raw data
            x2 = xs;
            y2 = ys;
       }

       if (pointAmount > 1) { //If there is more than one point, draw a line
            dx = x2 - x1; //Used to make less calculations later on
            dy = y2 - y1; // ""
            var line = $(document.createElement('div')).attr('id', 'line').appendTo('#grid'); //Create the line
            var length = Math.sqrt(dx * dx + dy * dy); //Pythagorean theorum (a^2+b^2=c^2) so we know our hypotenuse length
            var angle = 180 / 3.1415 * Math.acos((y2 - y1) / length); //Figure out our angle by taking the inverse cos function (arccos). This is because arccos returns an angle based on the cos of an angle, where the inputs are the adjacent and the hypotenuse (dy and length).
            var yo = 300 - length; //This is our margin top
            if (x2 - x1 < 0) {
                angle *= -1; //Invert the angle to allow for negative trends
            }
            line.css('top', (yo - y1) + 'px') //Setting the top to be in the middle of the point in terms of y axis
                .css('left', x1 + 'px') //Setting the left margin to be the middle of the point in terms of x axis
                .css('height', length)
                .css('-webkit-transform', 'rotate(' + angle + 'deg)')
                .css('-moz-transform', 'rotate(' + angle + 'deg)')
                .css('-o-transform', 'rotate(' + angle + 'deg)')
                .css('-ms-transform', 'rotate(' + angle + 'deg)')
                .css('transform', 'rotate(' + angle + 'deg)');
        }

        $("#x, #y").val("");
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
    for (var i = 0;i<11;i++){
        var left = i*(xAxis/10);
        var xsize = i*50; //Gives the margin left essentially
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
    for (var i=0;i<11;i++){
        var top = i*(yAxis/10);
        var ysize = i*30;
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
});