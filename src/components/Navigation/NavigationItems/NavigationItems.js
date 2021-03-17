import React from 'react';
import NavItem from '../NavigationItems/NavItem/NavItem'
import classes from './NavigationItems.module.css'

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/" active >BurgerBuilder</NavItem>
        <NavItem link="/" >CheckOut</NavItem>
    </ul>
);

export default navigationItems;