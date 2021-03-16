import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let ingredientList = Object.keys(props.ingredients)
        .map(ingredientType => {
            return [...Array(props.ingredients[ingredientType])] //Makes and empty array with the size of the key//
            .map( (_,i )=> {
                return <BurgerIngredient key={ingredientType + i} type={ingredientType}/> //ie key: salad1 type: salad
            });
         }).reduce((arr, el) => {
             return arr.concat(el)
         }, []);
    if (ingredientList.length === 0) {
        ingredientList = <p>Please start adding ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientList}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );

}


export default burger;