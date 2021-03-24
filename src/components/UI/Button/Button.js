import React from 'react';
import classes from './Button.module.css';
import PropTypes from 'prop-types';


const button = (props) => (
    <button
        disabled={props.disabled} 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
)

button.propTypes = {
    clicked: PropTypes.func,
    btnType: PropTypes.string
}

export default button;