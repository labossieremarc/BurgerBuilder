import classes from './Order.module.css'
import React, { Component, Fragment } from 'react';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'


class Order extends Component{
    
    
    render(){
        
        const ingredients = Object.entries(this.props.ingredients).map(([key, val])=>{
            return (
            <Fragment>
            <span className={classes.Span} key={key}>{key} : ({val})  </span>
            
            </Fragment>)
        });
    
    return(
    <div className={classes.Order}>
        
        
        Ingredients: {ingredients}
        <p className={classes.Para}>Price: <strong> {this.props.price.toFixed(2)} $</strong>
        <Button btnType='Delete'  clicked={this.props.clicked}>Delete</Button>  </p>
    </div>
    )};
    }

const mapDispatchToProps = dispatch => {
        return {
           
           
        }
    }
    



export default connect(null, mapDispatchToProps)(Order, axios);
