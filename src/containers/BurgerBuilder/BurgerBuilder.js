import React, { Component, Fragment } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action'




class BurgerBuilder extends Component{
    constructor(props) {
        super(props);
        this.state={
            showCheckOut: false,
            loading: false,
            isError: false
        }
    }
    componentDidMount () {
        this.props.onLoadPrice();
        // axios.get('/ingredients.json')
        // .then(response => {
        //     console.log('hete')
        //     this.props.onLoadIngredient(response.data)
            
            
        // })
        // .catch(error => {
        //     this.setState({isError: true})
        // })
    }
    showCheckOutHandler = () => {
        this.setState({showCheckOut: !this.state.showCheckOut})
    }
    purchaseContinueHandler = () => {
        this.props.history.push({pathname: '/checkout'})
    }
    disableOrderHandler = () => {
        const disabledInfo ={ ...this.props.ingredients };
        return Object.values(disabledInfo).some((val) => val > 0)  
    }
    disableIngredientsHandler = () => {
        const disabledInfo ={...this.props.ingredients}; 
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;   
        }
        return disabledInfo;
    }

    render( ) {    
        let orderSummary =null;
        let burger= this.state.isError ? <p>Ingredients cant be loaded</p> : <Spinner/>;
        if (this.props.ingredients){
        burger =(
            <Fragment>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    price={this.props.totalPrice}
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onRemIngredient}
                    disabled={this.disableIngredientsHandler()}
                    order={this.disableOrderHandler()}
                    showCheckout={this.showCheckOutHandler}/>
            </Fragment>
        )
        orderSummary = <OrderSummary 
            modalClosed={this.showCheckOutHandler} modalContinue={this.purchaseContinueHandler}
            ingredients={this.props.ingredients} price={this.props.totalPrice} />;
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
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (typeOf) => dispatch({type: actionTypes.ADD_INGREDIENT, typeOf}),
        onRemIngredient: (typeOf) => dispatch({type: actionTypes.REMOVE_INGREDIENT, typeOf}),
        onLoadPrice: () => dispatch({type: actionTypes.LOAD_PRICE}),
        onLoadIngredient: (ingredients) => ({type: actionTypes.LOAD_INGREDIENT, ingredients})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));