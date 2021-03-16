import React, { Component, Fragment } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:  0.4,
    meat:  1.3,
    bacon:  0.7,
}


class BurgerBuilder extends Component{
    constructor(props) {
        super(props);
        this.state={
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4
        }
    }
    addIngredientHandler = (type) => {
        this.setState(
            prevState => {
                const updatedIngredients = {...prevState.ingredients};
                updatedIngredients[type] = updatedIngredients[type] + 1;
                
                return{
                    ingredients: updatedIngredients,
                    totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
                    
                }
            }
        )
        
    }
    removeIngredientHandler = (type) => {
        this.setState(
            prevState => {
                const updatedIngredients = {...prevState.ingredients};
                if (updatedIngredients[type] <= 0)
                    return;
                updatedIngredients[type] = updatedIngredients[type] -1;
                return{
                    ingredients: updatedIngredients,
                    totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
                }
            }
        )
    }
    componentDidUpdate(){
        console.log(this.state.totalPrice)
    }
    render( ) {
        let disableOrder = 0;
        const disabledInfo ={
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disableOrder += disabledInfo[key];
            disableOrder = disableOrder !== 0 ?  true : false;
            disabledInfo[key] = disabledInfo[key] <=0;
            
        }
        // {salad: true, meat: false etc...}
        return(
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    order={disableOrder}/>
            </Fragment>
        );
    }
}


export default BurgerBuilder;