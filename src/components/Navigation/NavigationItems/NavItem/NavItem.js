import React from 'react';
import classes from './NavItem.module.css'
import PropTypes from 'prop-types';
const navItem = (props)=> (
    <li className={classes.NavItem}>
        <a href={props.link} className={props.active ? classes.active : null}>
            {props.children}</a></li>
);

navItem.propTypes = {
    link: PropTypes.string,
    active: PropTypes.bool
}
export default navItem;