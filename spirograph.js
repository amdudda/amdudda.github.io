/**
 * Created by amdudda on 2/11/16.
 */

// this code generates the spirograph image
var t=0;
var msec = 5; // time between drawing each line of the spirograph image

// let's use timers to make the drawing of the spirograph lines visible, instead of more-or-less instantly being completed.
// See http://www.w3schools.com/js/js_timing.asp for details on how this works.
var draw = setInterval(drawSpirograph,msec);
var stop = setTimeout(function() { clearInterval(draw); },msec*366);  // 365 degrees in a full circle; adding 1 just to ensure it goes all the way around

function getXYcoords(t) {
//        returns xy coordinates based on angle t - see Wikipedia article on "Spirograph" at https://en.wikipedia.org/wiki/Spirograph

    var R = 100; // radius of outer circle
    var r = 10; // radius of inner circle
    var p = 30; // rho; distance of pen from origin of r inside inner circle

    // t = angle between y axis and line from orgin to r.

    var l = p/r;
    var k = r/R;
    // therefore
    // p/R = l*k

    //(x,y) for angle t is:
    var x = R * ( ((1-k)*Math.cos(t)) + l*k*Math.cos( ( (1-k) / k) * t ) ) + 100;
    var y = R * ( ((1-k)*Math.sin(t)) + l*k*Math.sin( ( (1-k) / k) * t ) ) + 100;

    return {xCoord: x, yCoord: y};
}

// this parses out the color attribute of the lede container so I can use it to draw my spirograph-based image.
// found the code for this at: http://stackoverflow.com/questions/13980101/get-background-color-of-a-css-class-applied-to-an-element
 var el = document.getElementById("lede");
 var css = window.getComputedStyle(el);
 var drawingColor = css.getPropertyValue("color");  // this returns an RGB value, but that's OK, strokeStyle understands that.
 //console.log(drawingColor);

// this function draws the spirograph image
function drawSpirograph() {
    var myCanvas = document.getElementById("spiro");
    var ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    var startPt = getXYcoords(t);
    var endPt = getXYcoords(t + 1);
    ctx.moveTo(startPt.xCoord, startPt.yCoord);
    ctx.lineTo(endPt.xCoord, endPt.yCoord);
    ctx.strokeStyle = drawingColor;  //  "#00072B";
    ctx.stroke();
    t++;
    return ctx;
}