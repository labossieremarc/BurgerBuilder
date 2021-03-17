import React, { Component, Fragment } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


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
            totalPrice: 4,
            showCheckOut: false
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
    showCheckOutHandler = () => {
        this.setState({showCheckOut: true})
    }
    purchaseCancelHandler = () => {
        this.setState({showCheckOut: false})
    }
    purchaseContinueHandler = () => {
        console.log('You continued!')
    }
    componentDidUpdate(){
        
    }
    render( ) {
        
        const disabledInfo ={
            ...this.state.ingredients
        };
        const purchase = Object.values(disabledInfo).some((val) => val > 0)
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
            
        }

        // {salad: true, meat: false etc...}
        return(

            <Fragment>
                <Modal show={this.state.showCheckOut} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary 
                    modalClosed={this.purchaseCancelHandler} modalContinue={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients} price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    order={purchase}
                    showCheckout={this.showCheckOutHandler}/>
            </Fragment>

        );
    }
}


export default BurgerBuilder;