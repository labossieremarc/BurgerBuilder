import React from 'react';
import classes from './Input.module.css'


const input = (props) => {
    let inputElement =null;
    let validationError = null;
    const inputClasses = [classes.InputElement]
    if (props.valid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.DisplayError}>Please enter a valid {props.label}</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} 
                {...props.elementConfig} value={props.value} 
                  onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} 
                {...props.elementConfig} value={props.value} 
                  onChange={props.changed}/>
            break;
        case('select'):
            const options = (props.elementConfig.options).map( item => {
                return <option key={item.value} value={item.value}>{item.displayValue}</option>
            })
            inputElement = <select className={classes.InputElement} 
              onChange={props.changed}>{options}</select>
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} 
                {...props.elementConfig} value={props.value}/>
    }
    

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};



export default input;