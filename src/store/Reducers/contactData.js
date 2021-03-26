import * as actionType from '../actions/actionTypes'
import { updateObject } from '../utility';
const initialState = {
    orderForm:{
         name:{
            elementType: 'input',
            elementConfig : {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            shouldValidate: true,
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        street: 
        {
            elementType: 'input',
            elementConfig : {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            shouldValidate: true,
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        zipCode: 
        {
            elementType: 'input',
            elementConfig : {
                type: 'text',
                placeholder: 'ZipCode'
            },
            value: '',
            shouldValidate: true,
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig : {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            shouldValidate: true,
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig : {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            shouldValidate: true,
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'delivery', displayValue: 'Delivery'},
                    {value: 'pickup', displayValue: 'Pickup'},
                ]
            },
            value: 'delivery',
            validation: {
                shouldValidate: false
            },
            valid: true
        }
    },
    buttonDisable: false
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.INPUT_CHANGE:
            return updateObject(state, {orderForm: action.update,
                             buttonDisable: action.disableButton })
        default:
            return state;
    }
};

export default reducer;