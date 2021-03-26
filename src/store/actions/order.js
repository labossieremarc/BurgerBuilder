import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }  }

const ordersFail = (error) => {
    return {
        type: actionTypes.ORDER_FAIL,
        error
    }  }


export const purchaseInit = () => {
    return {type: actionTypes.PURCHASE_INIT } }


export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(getOrdersStart());
        axios.post('/orders.json', orderData)
        .then(response=> {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))   
        })
        .catch(error=> {
            dispatch(ordersFail(error))
        })
    }
}
const getOrdersSuccess = (orders) => {
    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        orders
    } }
const getOrdersStart = () => {
    return { type: actionTypes.GET_ORDERS_START}
}
export const getOrders = () => {
    console.log('hello')
    return dispatch => {
        dispatch(getOrdersStart())
        axios.get('/orders.json')
        .then(res => { 
            let gotOrders = [];
            gotOrders = Object.values(res.data)
            dispatch(getOrdersSuccess( gotOrders)); 
        })
        .catch(err => {
            dispatch(ordersFail(err))
        });
    }
}