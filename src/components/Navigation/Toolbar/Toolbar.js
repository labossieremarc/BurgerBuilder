import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import BurgerMenu from '../../UI/BurgerMenu/BurgerMenu'
import PropTypes from 'prop-types';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div><BurgerMenu clicked={props.clicked}/></div>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems></NavigationItems>
        </nav>
    </header>
)

toolbar.propTypes = {
    clicked: PropTypes.func
}
export default toolbar;