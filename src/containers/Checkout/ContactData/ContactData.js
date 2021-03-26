import React, { Component, Fragment } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as actionCreator from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class ContactData extends Component{

    componentDidMount(){
        console.log(this.props.totalPrice)
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
            orderData: formData   
        }
        this.props.onOrderBurger(order)
        

    }
    checkIfValid = (value, rules) => {
        let isValid = true; 
        if (rules.required){
            isValid = value.trim() !== '' && isValid;    
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid;
    }



    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {...this.props.orderForm};
        const copyOfForm = {...updatedOrderForm[inputId]}
        copyOfForm.value = event.target.value;
        copyOfForm.valid = this.checkIfValid(copyOfForm.value, copyOfForm.validation);
        copyOfForm.touched = true;
        updatedOrderForm[inputId] = copyOfForm;
        let formIsValid= true;
        Object.entries(updatedOrderForm).map(([key, val]) => {
            formIsValid = val.valid && formIsValid ? true : false;
            return null; 
        })
        this.props.onUpdateInput(updatedOrderForm, formIsValid)
    }


    render(){
        const formElementsArray = Object.entries(this.props.orderForm).map(([key, val]) => {
        return  <Input 
                label={key} elementConfig={val.elementConfig} elementType={val.elementType}
                value={val.value} key={key} valid={!val.valid} 
                shouldValidate={val.shouldValidate} touched={val.touched}
                changed={(event) =>this.inputChangedHandler(event, key)}/>})
            
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
        loading: state.ord.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onUpdateInput: (update, disableButton) => dispatch(actionCreator.updateInput(update, disableButton)),
        onOrderBurger: (orderData) => dispatch(actionCreator.purchaseBurger(orderData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));