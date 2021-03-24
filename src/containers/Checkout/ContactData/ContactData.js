import React, { Component, Fragment } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'

class ContactData extends Component{
    constructor(props){
        super(props)
        const formCreator = (inputType, formType, placeValue, inputValue) => (
                  {
                     elementType: inputType,
                     elementConfig : {
                         type: formType,
                         placeholder: placeValue
                     },
                     value: inputValue,
                     shouldValidate: true,
                     validation: {
                         required: true,
                         minLength: 5
                     },
                     valid: false,
                     touched: false
                 }
             
        )
        this.state = {
        orderForm:{
                name: formCreator('input', 'text', 'Your Name', ''),
                street: formCreator('input', 'text', 'Street', ''),
                zipCode: formCreator('input', 'text', 'Post Code', ''),
                country: formCreator('input', 'text', 'Country', ''),
                email: formCreator('input', 'email', 'Email', ''),
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'delivery', displayValue: 'Delivery'},
                            {value: 'pickup', displayValue: 'Pickup'},
                        ]
                    },
                    value: 'delivery',
                    validation: {
                        shouldValidate: false
                    },
                    valid: true
                }
            },
            loading: false,
            buttonDisable: false
        }

    }
    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
            
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid;
    }
    

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        let formData = {};
        for (const [key, val] of Object.entries(this.state.orderForm)){
            formData[key] = val.value
        }

        const order = { 
            ingredients: this.props.ingredients,
            price: this.props.totalprice,
            orderData: formData
            
        }
        axios.post('/orders.json', order)
                .then(response=> {
                    this.setState({ loading: false})
                    this.props.history.push('/');
                })
                .catch(error=> {
                    this.setState({ loading: false})
                })
    }
    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {...this.state.orderForm};
        const copyOfForm = {...updatedOrderForm[inputId]}
        copyOfForm.value = event.target.value;
        
        copyOfForm.valid = this.checkValidity(copyOfForm.value, copyOfForm.validation);
        copyOfForm.touched = true;
        updatedOrderForm[inputId] = copyOfForm;
        let formIsValid= true;
        Object.entries(updatedOrderForm).map(([key, val]) => {
            formIsValid = val.valid && formIsValid ? true : false;
            return null; 
        })
        this.setState({orderForm: updatedOrderForm, buttonDisable: formIsValid})
    }


    render(){
        const formElementsArray = Object.entries(this.state.orderForm).map(([key, val]) => {
        return  <Input 
                label={key} elementConfig={val.elementConfig} elementType={val.elementType}
                value={val.value} key={key} valid={!val.valid} 
                shouldValidate={val.shouldValidate} touched={val.touched}
                changed={(event) =>this.inputChangedHandler(event, key)}/>})
            
        return(
            <div className={classes.ContactData}>
                {this.state.loading ? <Spinner /> : (
                <Fragment>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                {formElementsArray}
                <Button disabled={!this.state.buttonDisable} btnType="Success">Order</Button>
                </form>
                </Fragment>
                )}
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}


export default connect(mapStateToProps)(ContactData);