import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerMenu.module.css'

const burgerMenu = (props) => (
    <div className={classes.BurgerMenu} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
    </div>
);

burgerMenu.propTypes = {
    clicked: PropTypes.func
}

export default burgerMenu;