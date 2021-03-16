import React from 'react';
import classes from './BuildControl.module.css'

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.More}
            onClick={props.added}>Add</button>
        <button 
            disabled={props.disabled}
            className={classes.Less}
            onClick={props.removed}>Remove</button>
    </div>
)

export default BuildControl;