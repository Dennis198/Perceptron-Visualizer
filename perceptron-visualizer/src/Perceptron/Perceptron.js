import React from 'react';
import "./Perceptron.css";
import {adjustWeights, guess} from "./methods/help-methods/help-methods-perceptron";
import {reDrawCanvas, drawPointOnClick, resetCanvas, reDrawPoints} from "./methods/canvas/drawmethods2dplane";
import {drawPerceptronFigure,updateWeightDisplay} from "./methods/canvas/drawmethodsperceptronfigure";
import { Button, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

 /**
  Code for the custom slider look
  * */ 
 function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };

  const PrettoSlider = withStyles({
    root: {
      color: 'red',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
/**End Slide Code */

//Constants Canvas "2dplane"
const CANVAS_WIDTH=400;
const CANVAS_HEIGHT=350;
//Constants Canvas "visual_perceptron"
const CANVAS_P_WIDTH=400;
const CANVAS_P_HEIGHT=180;
//Constant number of Max Iteration  for the Perceptron Algorithm
const MAX_ITERATION=500000;

export default class Perceptron extends React.Component{
    intervalID = 0;
    constructor(props){
        super(props);
        this.state = {
            points: [],
            classMode: true,//true=class:Red, false=class:Blue,
            weights: createInitialWeights(),
            isLearning: false,
            error:0,
            lernrate:0.9,
        }
    }

    componentDidMount(){ 
        resetCanvas();
        drawPerceptronFigure(this.state.weights);    
    }

    //Draws a point on Canvas "2dplane" and save it in the array points
    drawPointOnClick(e){
        if(this.state.isRunning) return;
        let newPoints = drawPointOnClick(e,this.state.points, this.state.classMode);
        this.setState({points: newPoints});
    }

    //Switches the Classes (Red <-> Blue)
    changeClass(){
        this.setState({classMode: !this.state.classMode});
    }

    //Executes the Perceptron Algorithm 
    train(){
        if(this.state.points.length===0) return null;
        const points = this.state.points;
        let weights = this.state.weights;
        let allRight=false;
        let lr = this.state.lernrate;//Lernrate
        let counter=0;
        while(!allRight && counter<MAX_ITERATION){
            allRight=true;
            for(let i=0;i<points.length;i++){
                    const guess_Label=guess(weights, points[i].posX, points[i].posY);//Calculate the IS-Value
                    const error = points[i].label-guess_Label;//Calculate Error (IS-Target)
                    if(error!==0){
                        adjustWeights(weights, points[i], error, lr);// Changes the Weights according to the Perceptron Algorithm
                        allRight=false;
                        counter++;
                    }
            }
        }
        reDrawCanvas(weights,points);
        this.setState({weights: weights, error: this.countMisclassified(weights,points)});
    }

    //Executes the Perceptron Algorithm (One Iteration) every 50 ms and displays
    //it every 1000 Iteration or if a a Hyerplane is foubd
    trainVisual(){
        this.setState({isLearning:true})
        let allRight;
        const points = this.state.points;
        let weights = this.state.weights;
        let counter=0;
        let lr = this.state.lernrate; //Lernrate
        this.intervalID = setInterval(() => {
            allRight=true;
            for(let i=0;i<points.length;i++){
                 const guess_Label=guess(weights, points[i].posX, points[i].posY);//Calculate the IS-Value
                 const error = points[i].label-guess_Label;//Calculate Error (IS-Target)
                 if(error!==0){
                     allRight=false;
                     counter++;
                     adjustWeights(weights, points[i], error, lr); // Changes the Weights according to the Perceptron Algorithm
                     if(counter%1000===0)
                        reDrawCanvas(weights,points);
                 }
                 reDrawCanvas(weights,points);
            }

            //Check if Algrithm should stops
            if(allRight || counter>MAX_ITERATION){
                this.setState({error: this.countMisclassified(weights, points)});
                this.stopTraining();
                this.setState({weights:weights});
            } 
        }, 50);
    }

    //Counts the Misclassified Points and Displays it
    countMisclassified(weights, points){
        let counter=0;
        for(let i=0;i<points.length;i++){
            var p = points[i];
            if(p.label!==guess(weights,p.posX,p.posY)){
            counter ++;
            }
        }
        return counter;
    }

    //Stops the "Visual" Training
    stopTraining(){
        clearInterval(this.intervalID);
        this.setState({isLearning:false});
    }

    //Resets the Weights and the display in Canvas "visual_perceptron"
    resetWeights(){
        this.setState({weights: createInitialWeights()});
        setTimeout(() => {
            resetCanvas();
            reDrawPoints(this.state.points);
            updateWeightDisplay(this.state.weights);
        }, 20);
    }

    //Clears Canvas "2dplane" and all the points
    clear(){
        this.setState({points:[]});
        resetCanvas();
    }

    //event Handler for Lernrate Change
    handleLernrateChange(e, val){ 
        this.setState({lernrate : val})
    }

    render(){
        const {isLearning, classMode, error, lernrate} = this.state;
        return(
            <div className="perceptron">
                <Button variant="contained" color={classMode?"secondary": "primary"} onClick={() => this.changeClass()}>{classMode?"Red":"Blue"}</Button>
                <Button disabled={isLearning} variant="contained" onClick={() => this.train()}>Train</Button>
                <Button disabled={isLearning} variant="contained" onClick={() => this.trainVisual()}>Train Visual</Button>
                <Button variant="contained" onClick={(e) => this.stopTraining()}>Stop Training</Button>
                <Button disabled={isLearning} variant="contained" onClick={() => this.resetWeights()}>Reset Weights</Button>
                <Button disabled={isLearning} variant="contained" onClick={(e) => this.clear(e)}>Clear</Button>
                <div className="perceptron__slider">
                    <PrettoSlider disabled={isLearning} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0.9} min={0} max={1.5} step={0.1}
                    onChange={(e, val) => this.handleLernrateChange(e, val)}  
                    />
                    <h4>Lernrate: {lernrate}</h4>
                </div>
                <div className="perceptron__canvas">
                    <canvas className="perceptron__canvas__2dplane" id="2d-plane" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                        onClick={(e) => this.drawPointOnClick(e)}
                    ></canvas>
                    <div className="perceptron__canvas__right">
                        <div className="perceptron__canvas__right__labels">
                            <h4>Missclassifed: {error}</h4>
                        </div>
                        <canvas className="perceptron__canvas__right__info" id="visual_perceptron" width={CANVAS_P_WIDTH} height={CANVAS_P_HEIGHT}
                        ></canvas>
                    </div>
                </div>
            </div>
        );
    }
}

const createInitialWeights=() =>{
    return {
        weight_1:0,
        weight_2:0,
        bias_weight:0
    } 
};
