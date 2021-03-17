import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'},
];


const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.order} 
        onClick={props.showCheckout}
        >Order</button>
    </div>
);

buildControls.propTypes = {
    price: PropTypes.number,
    order: PropTypes.bool,
    showCheckout: PropTypes.func,
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    disabled: PropTypes.object
}

export default buildControls;