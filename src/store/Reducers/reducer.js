import * as actionTypes from '../action'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:  0.4,
    meat:  1.3,
    bacon:  0.7,
}

const initialState = {
    ingredients: {
      meat:1,
      cheese: 1,
      bacon: 1,
      salad:1
    },
    totalPrice: 4,

}

const reducer = (state = initialState, action) => {
  switch (action.type) {

  case actionTypes.ADD_INGREDIENT:
    return { 
        ...state, 
        ingredients: {
          ...state.ingredients,
          [action.typeOf]: state.ingredients[action.typeOf] +1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.typeOf],
    };
  case actionTypes.REMOVE_INGREDIENT:
    
    const removeIngredients = {...state.ingredients};
    if (removeIngredients[action.typeOf] <= 0)
            return; 
    return{
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.typeOf]: state.ingredients[action.typeOf] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.typeOf]
    }
  case actionTypes.LOAD_PRICE:
    let newPrice = 4;
    Object.keys(state.ingredients).map(type => {
        newPrice += INGREDIENT_PRICES[type] * state.ingredients[type];
        return null;
    })
    return{
        ...state,
        totalPrice: newPrice
    }
  case actionTypes.LOAD_INGREDIENT:
    const intialIngredients = action.ingredients
    return{
        ...state,
        ingredients: intialIngredients
      }
  default:
    return state
  }
};

export default reducer;



