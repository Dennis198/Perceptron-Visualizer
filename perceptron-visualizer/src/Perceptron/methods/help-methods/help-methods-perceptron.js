/*
This File handles the calculation for the Perecptron algorithm
calculate new Weights, Label and the Sign
*/

//Value of the Bias
const BIAS_VALUE=1;

//Calculate the new Weights accoring to the Perecptron Algorithm
export function adjustWeights(weights,point, error, lr){
    weights.weight_1+=error*point.posX*lr;
    weights.weight_2+=error*point.posY*lr;
    weights.bias_weight+=error*BIAS_VALUE*lr;
}

//Calculates the dot product of the weights and the point (x,y,1)
export function guess(weights, x, y){
    let label=x*weights.weight_1+y*weights.weight_2+weights.bias_weight*BIAS_VALUE;
    return sign(label);
}

//Return the sign of a number
function sign(number){
    if(number > 0) return 1;
    if(number < 0) return -1;
    return 0;
}