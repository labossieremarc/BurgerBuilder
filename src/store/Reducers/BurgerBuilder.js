import * as actionType from '../actions/actionTypes'
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:  0.4,
    meat:  1.3,
    bacon:  0.7,
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const loadPrice = (state) => {
    let newPrice = 4;
    Object.keys(state.ingredients).map(type => {
        newPrice += INGREDIENT_PRICES[type] * state.ingredients[type];
        return null;
    })
    return updateObject(state, {totalPrice: newPrice}) 
}
const addIngredient = (state, action) => {
  const addedIngredient= { [action.typeOf]: state.ingredients[action.typeOf] +1};
  const addedIngredients = updateObject(state.ingredients, addedIngredient)
    return updateObject(state, {ingredients: addedIngredients})
}
const removeIngredient = (state, action) => {
  const removedIngredient= { [action.typeOf]: state.ingredients[action.typeOf] -1};
  const removedIngredients = updateObject(state.ingredients, removedIngredient)
      return updateObject(state, {ingredients: removedIngredients})
}
const loadIngredients = (state, action) => {
  
}


const reducer = (state = initialState, action) => {
  switch (action.type) {

  case actionType.ADD_INGREDIENT:
      return addIngredient(state, action)  
  case actionType.REMOVE_INGREDIENT:
      const checkIngredients = {...state.ingredients};
      if (checkIngredients[action.typeOf] <= 0)
        return; 
      return removeIngredient(state, action)
  case actionType.LOAD_PRICE:
      return loadPrice(state) 
  case actionType.LOAD_INGREDIENT:
      return updateObject(state, {
              ingredients: {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat:  action.ingredients.meat
              }, error: false})
  case actionType.LOAD_INGREDIENTS_FAILED:
      return updateObject(state, {error: true})
  default:
      return state
  }
};

export default reducer;



