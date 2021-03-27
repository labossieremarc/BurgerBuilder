import React, { Component, Fragment } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actionCreator from '../../store/actions/index';
import {connect} from 'react-redux'
import { inputChangedHandler, formValidHandler} from '../../components/UI/FormValidation/FormValidation'


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                
            }
        },
        formisValid: false,
        isSignUp: true
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
    }
    switchAuthModeHandler = () => {
        console.log('clicked')
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    }
    formHandler =(form, event, inputName) =>{
        const contactForm = inputChangedHandler(form, event, inputName);
        const validForm = formValidHandler(contactForm)
        this.setState({controls: contactForm, formisValid: validForm})
     }
    render () {
        const formElementsArray = Object.entries(this.state.controls).map(([key, val]) => {
            return  <Input 
                    label={key} elementConfig={val.elementConfig} elementType={val.elementType}
                    value={val.value} key={key} invalid={!val.valid} 
                    shouldValidate={val.validation.required} touched={val.touched}
                    changed={(event) =>this.formHandler(this.state.controls ,event, key)}/>})
            
        return (
            <div className={classes.Auth}>
               <Fragment>
                <h4>Enter your Contact Data to {this.state.isSignUp ? 'Sign Up' : 'Sign In'}</h4>
                <form  onSubmit={this.submitHandler}>
                {formElementsArray}
                <Button disabled={!this.state.formisValid} btnType="Success">Submit</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>
                </Fragment>
            </div>

        )

    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email, password) => dispatch(actionCreator.auth(email, password))
    }
}

export default connect(null,mapDispatchToProps)(Auth);