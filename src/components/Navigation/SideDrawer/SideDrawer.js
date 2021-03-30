import React, { Fragment } from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop'
import PropTypes from 'prop-types';

const SideDrawer = (props) => {

    return (
        <Fragment>
            <BackDrop show={props.show} clicked={props.clicked}/>

        <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')} 
            onClick={props.clicked}>
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav>
                <NavigationItems auth={props.auth} />
            </nav>
        </div>

        </Fragment>
    )
};

SideDrawer.propTypes = {
    show: PropTypes.bool,
    clicked: PropTypes.func
}

export default SideDrawer;