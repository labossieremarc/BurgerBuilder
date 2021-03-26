import classes from './Order.module.css'
import React from 'react';


const order = (props) => {

    const ingredients = Object.entries(props.ingredients).map(([key, val])=>{
        return <span className={classes.Span} key={key}>{key} : ({val}) </span>
    });

    return(
    <div className={classes.Order}>
        
        
        Ingredients: {ingredients}
        <p>Price: <strong> {props.price.toFixed(2)} $</strong></p>
    </div>
    )};

export default order;
