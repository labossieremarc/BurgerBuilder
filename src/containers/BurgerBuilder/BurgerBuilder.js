import React, { Component, Fragment } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index'




class BurgerBuilder extends Component{
    constructor(props) {
        super(props);
        this.state={
            showCheckOut: false,
        }
        
    }
    componentDidMount () {
        this.props.onInitIngredients();
        if(this.props.ingredients)
            this.props.onLoadPrice();
    }
    componentDidUpdate(){
        if(this.props.ingredients)
            this.props.onLoadPrice();
    }
    showCheckOutHandler = () => {
        this.setState({showCheckOut: !this.state.showCheckOut})
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({pathname: '/checkout'})
    }
    disableOrderHandler = () => {
        const hasIngredients = Object.values({...this.props.ingredients}).some((val) => val > 0);
        return  hasIngredients && this.props.isLoggedin ? true : false
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
        let burger= !this.props.error ? <p></p> : <Spinner/>;
        if (this.props.ingredients){
       
        burger =(
            <Fragment>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    price={this.props.totalPrice}
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onRemIngredient}
                    isLoggedIn = {this.props.isLoggedin}
                    disabled={this.disableIngredientsHandler()}
                    order={this.disableOrderHandler()}
                    showCheckout={this.showCheckOutHandler}/>
            </Fragment>
        )
        orderSummary = <OrderSummary 
            modalClosed={this.showCheckOutHandler} modalContinue={this.purchaseContinueHandler}
            ingredients={this.props.ingredients} price={this.props.totalPrice} />;
        }
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
        ingredients: state.bur.ingredients,
        totalPrice: state.bur.totalPrice,
        error: state.bur.error,
        isLoggedin: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (typeOf) => dispatch(actionCreator.addIngredient(typeOf)),
        onRemIngredient: (typeOf) => dispatch(actionCreator.removeIngredient(typeOf)),
        onLoadPrice: () => dispatch(actionCreator.loadPrice()),
        onInitIngredients: () => dispatch(actionCreator.initIngredients()),
        onInitPurchase: () => dispatch(actionCreator.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));