import React, { Component, Fragment } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
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
            ingredients: null,
            totalPrice: 4,
            showCheckOut: false,
            loading: false,
            isError: false
        }
    }
    componentDidMount () {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
            this.addIngredientLoad();
        })
        .catch(error => {
            this.setState({isError: true})
        })
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
        )}
    addIngredientLoad =() => {
        let newPrice = this.state.totalPrice;
        Object.keys(this.state.ingredients).map(type => {
            newPrice += INGREDIENT_PRICES[type] * this.state.ingredients[type];
            return null;
        })
        this.setState({totalPrice: newPrice})
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
        this.setState({showCheckOut: !this.state.showCheckOut})
    }
    purchaseContinueHandler = () => {
        // console.log('You continued!')
        this.setState({loading: true})
        const order = { 
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Marc',
                address: {
                    street: '21 Jump Street',
                    zipCode: '34235',
                    country: 'Ice Planet Hoth'
                },
                email: 'test@alderan.com'
            },
            deliveryMethod: 'pickup'
        }
        axios.post('/orders.json', order)
                .then(response=> {
                    this.setState({
                        loading: false,
                        showCheckOut: false
                    })
                })
                .catch(error=> {
                    this.setState({
                        loading: false,
                        showCheckOut: false
                    })
                })
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
        let orderSummary =null;
        let burger= this.state.isError ? <p>Ingredients cant be loaded</p> : <Spinner/>;
        if (this.state.ingredients){
        burger =(
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    order={purchase}
                    showCheckout={this.showCheckOutHandler}/>
            </Fragment>
        )
        orderSummary = <OrderSummary 
            modalClosed={this.showCheckOutHandler} modalContinue={this.purchaseContinueHandler}
            ingredients={this.state.ingredients} price={this.state.totalPrice} />;
        }
            
        if (this.state.loading)
            orderSummary = <Spinner/>;
        // {salad: true, meat: false etc...}
        return(

            <Fragment>
                <Modal show={this.state.showCheckOut} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>

        );
    }
}


export default withErrorHandler(BurgerBuilder, axios);