import React from 'react';
import NavItem from '../NavigationItems/NavItem/NavItem'
import classes from './NavigationItems.module.css'



const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/" >BurgerBuilder</NavItem>
        
        {props.auth 
            ?<NavItem link="/orders" >Orders</NavItem>
            : null}
        {!props.auth 
            ? <NavItem link="/auth" > SignIn/SignUp</NavItem>
            : <NavItem link="/logout" > Logout</NavItem>}
    </ul>
);



export default navigationItems;