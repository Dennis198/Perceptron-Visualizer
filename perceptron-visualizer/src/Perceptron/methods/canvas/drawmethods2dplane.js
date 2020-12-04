/*
This File handles the Drawing for the Canvas id="2d-plane" (the left one one)
*/

import {guess} from "../help-methods/help-methods-perceptron";
import {updateWeightDisplay} from "./drawmethodsperceptronfigure";

//Consts for the Crosses Display if a Points is Missclassified
const CROSS_SIZE=5;
const CROSS_WIDTH=3;
//Const Class Colors
const COLOR_CLASS_0="red";
const COLOR_CLASS_1="blue";
//Const Canvas Width and Heights
const CANVAS_WIDTH=400;
const CANVAS_HEIGHT=350;

//Resets the Canvas to the initial state
export function resetCanvas(){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    context.beginPath();
    context.fillStyle = "lightgray";
    context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    context.stroke(); 
}

//Draws a Point to the Canvas where it was clicked and adds it to the points array
export function drawPointOnClick(e, points, classMode){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    var pos = getMousePos(canvas, e);
    let posX = Math.floor(pos.x);
    let posY = Math.floor(pos.y);
    context.fillStyle =classMode ? COLOR_CLASS_0 : COLOR_CLASS_1;
    context.beginPath();
    context.arc(posX, posY, 5, 0, 2*Math.PI);
    context.fill();
    var newPoint=createPoint(posX,posY,classMode ? -1:1);
    points.push(newPoint);
    return points;
}

//Updates the Canvas for the Training Iterations or after it is Finished in 3 Steps
//1.Classifie every Pixel in the Canvas and color it (Background)
//2.Redraw all the Points in points
//3.Draw the seperation Line
//4.Update/Redraw the weight display in canvas "visual_perceptron"
export function reDrawCanvas(weights,points){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    //Iterats throw the Canvas Pixel by Pixel
    for(let i = 0; i < data.length; i += 4) {
        var x = (i / 4) % imgData.width;//x-Koordinate in the Canvas
        var y = Math.floor((i / 4) / imgData.height);//x-Koordinate in the Canvas
        var label=guess(weights, x,y)//Classifie the pixel x,y
        if(label===1){
            drawPixels(x,y,context,"#87CEFA");//Class Blue
        } else if(label===-1) {
            drawPixels(x,y,context,"#FA8072");//Class Red
        } else {
            drawPixels(x,y,context,"black"); // guess=0 => could be Class Red or Blue
        }
    }
    reDrawPoints(points); // ReDraw All the Points in Points
    drawSeperationLine(weights); // Draws the seperation Line
    drawMarkerRightOrWrong(points,weights); // Draws little Crosses over the points who are misclassified
    updateWeightDisplay(weights); // update the Weight display in Canvas "visual_perceptron"
}

//Draw the seperation line
function drawSeperationLine(weights){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    context.strokeStyle = '#ADFF2F';
    context.beginPath();
    context.lineWidth = 4;
    context.moveTo(0, -(weights.bias_weight/weights.weight_2));
    context.lineTo(400, -(weights.bias_weight/weights.weight_2)-(weights.weight_1/weights.weight_2)*400);
    context.stroke(); 
}

//Draws crosses over the Points who are misclassified
function drawMarkerRightOrWrong(points,weights){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    for(let i=0;i<points.length;i++){
        var p = points[i];
        if(p.label!==guess(weights,p.posX,p.posY)){
            context.beginPath();
            context.lineWidth = CROSS_WIDTH;
            context.moveTo(p.posX - CROSS_SIZE, p.posY - CROSS_SIZE);
            context.lineTo(p.posX + CROSS_SIZE, p.posY + CROSS_SIZE);
        
            context.moveTo(p.posX + CROSS_SIZE, p.posY - CROSS_SIZE);
            context.lineTo(p.posX - CROSS_SIZE, p.posY + CROSS_SIZE);
            context.stroke();
            context.lineWidth = 1;
        }
    }
}

//Draw a Rectangle of size 2x2 for every pixel
function drawPixels(x,y,context,color){
    context.fillStyle = color;
    context.fillRect(x,y,2,2);
}

//Draws the point from points
export function reDrawPoints(points){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    for(let i=0;i<points.length;i++){
        var p = points[i];
        context.fillStyle = p.label===-1 ? COLOR_CLASS_0:COLOR_CLASS_1;
        context.beginPath();
        context.arc(p.posX, p.posY, 5, 0, 2*Math.PI);
        context.fill();
    }
}

//Gets the Mouse position on the Canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

//Creates a new Point with x,y,label for the array points
const createPoint=(x,y,classLabel)=>{
    return {
        posX:x,
        posY:y,
        label: classLabel,
    };
}
