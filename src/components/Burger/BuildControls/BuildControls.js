import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';


const controls = [
    { label: 'Salad' , type: 'salad'},
    { label: 'Bacon' , type: 'bacon'},
    { label: 'Cheese' , type: 'cheese'},
    { label: 'Meat' , type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>&#8377;{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>{
           return <BuildControl
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={()=>props.ingredientAdd(ctrl.type)} 
                    removed={()=>props.ingredientRemove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                   />
        })}    
        <button 
            className={classes.OrderButton}
            disabled={!props.canPurchase}
            onClick={props.isOrderedHandler}
            >ORDER NOW</button>    
    </div>
);

export default buildControls;