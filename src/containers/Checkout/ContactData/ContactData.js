import React, { Component, Fragment } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as actionCreator from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { inputChangedHandler, formValidHandler} from '../../../components/UI/FormValidation/FormValidation'

class ContactData extends Component{

    componentDidMount(){
        
    }

    orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (const [key, val] of Object.entries(this.props.orderForm)){
            formData[key] = val.value
        }
        const order = { 
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId   
        }
        this.props.onOrderBurger(order, this.props.token)
        

    }
    formHandler =(form, event, inputName) =>{
       const contactForm = inputChangedHandler(form, event, inputName);
       const validForm = formValidHandler(contactForm)
       this.props.onUpdateInput(contactForm, validForm)
    }
    





    render(){
        const formElementsArray = Object.entries(this.props.orderForm).map(([key, val]) => {
            return  <Input 
                    label={key} elementConfig={val.elementConfig} elementType={val.elementType}
                    value={val.value} key={key} invalid={!val.valid} 
                    shouldValidate={val.shouldValidate} touched={val.touched}
                    changed={(event) =>this.formHandler(this.props.orderForm,event, key)}/>})
            
        return(
            <div className={classes.ContactData}>
                {this.props.loading ? <Spinner /> : (
                <Fragment>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                {formElementsArray}
                <Button disabled={!this.props.buttonDisable} btnType="Success">Order</Button>
                </form>
                </Fragment>
                )}
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.bur.ingredients,
        totalPrice: state.bur.totalPrice,
        orderForm: state.con.orderForm,
        buttonDisable: state.con.buttonDisable,
        loading: state.ord.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onUpdateInput: (update, disableButton) => dispatch(actionCreator.updateInput(update, disableButton)),
        onOrderBurger: (orderData, token) => dispatch(actionCreator.purchaseBurger(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));