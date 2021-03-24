import React from 'react';
import classes from './NavItem.module.css'
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
const navItem = (props)=> (
    <li className={classes.NavItem}>
        <NavLink 
        to={props.link} 
        exact
        activeClassName={classes.active}>
        {props.children}</NavLink></li>
);

navItem.propTypes = {
    link: PropTypes.string,
}
export default navItem;