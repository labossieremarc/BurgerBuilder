const checkIfValid = (value, rules) => {
    let isValid = true; 
    if (rules.required){
        isValid = value.trim() !== '' && isValid;    
    }
    if (rules.minLength){
        isValid = value.length >= rules.minLength && isValid
    }
    if(rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
      
    if(rules.numeric) {
       const pattern = /^\d+$/;  
       isValid = pattern.test(value) && isValid;
    }
    
    return isValid;
}

export const inputChangedHandler = (form, event, inputName) => {
    const updateControls = {
        ...form,
        [inputName] : {
            ...form[inputName],
            value: event.target.value,
            valid: checkIfValid(event.target.value, form[inputName].validation),
            touched: true
        }
    }
    return updateControls
}

export const formValidHandler = (form) => {
    let formIsValid= true;
    Object.entries(form).map(([key, val]) => {
        formIsValid = val.valid && formIsValid ? true : false;
        return null; 
    })
    return formIsValid;
}