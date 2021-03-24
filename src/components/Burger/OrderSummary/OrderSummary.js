import React, { Component, Fragment } from 'react';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class OrderSummary extends Component {
    render ( ) {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
            <li  key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}: {this.props.ingredients[igKey]}</span>
            </li>
            )
        })
        return(
            <Fragment>
            <h3>Your order comes to a total of {this.props.price.toFixed(2)}$</h3>
            <p>A tasty burger with the following ingredients</p>
            <ul className={classes.List}>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.modalClosed}>Cancel</Button>

            <Button btnType="Success" clicked={this.props.modalContinue}>Continue</Button>

        </Fragment>
        )
    }
};

OrderSummary.propTypes = {
    ingredients: PropTypes.object,
    price: PropTypes.number,
    modalClosed: PropTypes.func,
    modalContinue: PropTypes.func
}

export default OrderSummary;