import React, { Component, Fragment } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actionCreator from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)

    }
    switchAuthModeHandler = () => {
        
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
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
   
        const formElementsArray = Object.entries(this.state.controls).map(([key, val]) => {
            return  <Input 
                    label={key} elementConfig={val.elementConfig} elementType={val.elementType}
                    value={val.value} key={key} invalid={!val.valid} 
                    shouldValidate={val.validation.required} touched={val.touched}
                    changed={(event) =>this.formHandler(this.state.controls ,event, key)}/>})
            
            let form = (
                <div className={classes.Auth}>
                <h4>{this.state.isSignUp ? 'Sign Up To Start Making Burgers!' : 'Welcome back, delicious burgers await!'}</h4>
                {errorMessage}
                <form  onSubmit={this.submitHandler}>
                {formElementsArray}
                <Button 
                    disabled={!this.state.formisValid} btnType="Success">Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler} 
                    btnType="Danger">Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>
                </div>  )

                if (this.props.loading) form= <Spinner/>
                if (this.props.isLoggedin) form= <Redirect to='/'/>
        return (
            <Fragment>
            {form}
            </Fragment>
        )
            
        }       
       
    
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreator.auth(email, password, isSignUp))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedin: state.auth.token !== null
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);