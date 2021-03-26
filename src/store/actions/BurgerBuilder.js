import * as actionType from './actionTypes';
import axios from '../../axios-orders'

export const loadIngredients = (ingredients) => {
    return {
        type: actionType.LOAD_INGREDIENT,
        ingredients
    }
}

export const loadPrice = () => {
    return {
        type: actionType.LOAD_PRICE,
    }
}

export const addIngredient = (typeOf) => {
    return {
        type: actionType.ADD_INGREDIENT,
        typeOf
    }
}

export const removeIngredient = (typeOf) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        typeOf
    }
} 
const loadIngredientsFailed = () => {
    return {
        type: actionType.LOAD_INGREDIENTS_FAILED
    }
}



export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            dispatch(loadIngredients(response.data))
            dispatch(loadPrice())
        })
        .catch(error => {
            dispatch(loadIngredientsFailed())
        })
    }
};