/*
This File handles the Drawing for the Canvas id="visual_perceptron" (the right one)
*/

//Redraws the Figure (Canvas "visual_perecptron")
export function drawPerceptronFigure(weights){
    var canvas = document.getElementById("visual_perceptron");
    var context = canvas.getContext("2d");
    //Displays the Biasneuron
    context.fillStyle="#ADD8E6";
    context.beginPath();
    context.arc(20, 30, 20, 0, 2*Math.PI);
    context.fill();
    context.fillStyle="black";
    context.font = "20px Arial";
    context.fillText("1", 20-6, 30+6); 
    //Displays the X Neuron (X Value)
    context.fillStyle="#ADD8E6";
    context.beginPath();
    context.arc(20, 90, 20, 0, 2*Math.PI);
    context.fill();
    context.fillStyle="black";
    context.font = "20px Arial";
    context.fillText("X", 20-7, 90+7); 
    //Displays the Y Neuron (Y Value)
    context.fillStyle="#ADD8E6";
    context.beginPath();
    context.arc(20, 150, 20, 0, 2*Math.PI);
    context.fill();
    context.fillStyle="black";
    context.font = "20px Arial";
    context.fillText("Y", 20-7, 150+7);
    ////Displays the + Symbol
    context.fillStyle="#ADD8E6";
    context.beginPath();
    context.arc(330, 90, 20, 0, 2*Math.PI);
    context.fill();
    context.fillStyle="black";
    context.font = "20px Arial";
    context.fillText("∑", 330-7, 90+5);
    //Display line from Bias to the right
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(40, 30);
    context.lineTo(285,30);
    context.stroke();
    ////Display line from X to + 
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(40, 90);
    context.lineTo(310,90);
    context.stroke();
    //Display line from Y to the right
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(40, 150);
    context.lineTo(285,150);
    context.stroke();

    //Weights Display
    context.fillStyle="black";
    //bias
    context.font = "20px Arial";
    context.fillText("w0: "+(Math.round(weights.bias_weight * 100) / 100).toFixed(2), 50, 25);
    //w1
    context.font = "20px Arial";
    context.fillText("w1: "+(Math.round(weights.weight_1 * 100) / 100).toFixed(2), 50, 85);
    //w3
    context.font = "20px Arial";
    context.fillText("w2: "+(Math.round(weights.weight_2 * 100) / 100).toFixed(2), 50, 145);
            
    //Line from Y(Right) to up
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(285,150);
    context.lineTo(285,90);
    context.stroke();
    //Line from Y(Right) to Down
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(285,30);
    context.lineTo(285,90);
    context.stroke();
    //Path from + to Out
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(350, 90);
    context.lineTo(370, 90);
    context.stroke();
    //out
    context.font = "20px Arial";
    context.fillText("out", 372, 95);
}

//Updates the weight display
export function updateWeightDisplay(weights){
    var canvas = document.getElementById("visual_perceptron");
    var context = canvas.getContext("2d");
    //Clears the old display (over-milled)
    context.clearRect(50,10,233,17);
    context.clearRect(50,70,233,17);
    context.clearRect(50,130,233,17);
    context.fillStyle="black";
    //bias
    context.font = "20px Arial";
    context.fillText("w0: "+(Math.round(weights.bias_weight * 100) / 100).toFixed(2), 50, 25);
    //w1
    context.font = "20px Arial";
    context.fillText("w1: "+(Math.round(weights.weight_1 * 100) / 100).toFixed(2), 50, 85);
    //w3
    context.font = "20px Arial";
    context.fillText("w2: "+(Math.round(weights.weight_2 * 100) / 100).toFixed(2), 50, 145);
}