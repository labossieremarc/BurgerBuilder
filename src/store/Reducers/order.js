import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId  
        
    }
    
    return updateObject(
        state, 
        {loading: false, purchased: true, orders: state.orders.concat(newOrder)})
    ; 
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false})
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action)
        case actionTypes.ORDER_FAIL:
            return updateObject(state, {loading: false});
        case actionTypes.GET_ORDERS_START:
            return updateObject(state, {loading: true})
        case actionTypes.GET_ORDERS_SUCCESS:
            return updateObject(state, { orders: action.orders, loading: false})
        case actionTypes.DELETE_ORDERS:
            return updateObject(state, {orders: [], loading: false})
        default:
            return state;
    }
};

export default reducer;