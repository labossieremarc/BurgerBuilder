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


export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(getOrdersStart());
        axios.post('/orders.json?auth=' + token, orderData)
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
export const getOrders = (token, userId) => {
    return dispatch => {
        dispatch(getOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' + queryParams)
        .then(res => { 
            let gotOrders = [];       
            for (const [key, val] of Object.entries(res.data)){
                let order = {...val, id: key}
                gotOrders.push(order)
            }
            dispatch(getOrdersSuccess( gotOrders)); 
        })
        .catch(err => {
            dispatch(ordersFail(err))
        });
    }
}
const deleteSuccess = () => {
    return {
        type: actionTypes.DELETE_ORDERS, 
    } }
export const deleteOrder =(token, id, userId) => {
        
    return dispatch => {
        dispatch(getOrdersStart())
        axios.delete('./orders/' + id + '.json?auth='+ token)
        .then(response => {
            dispatch(deleteSuccess())
            dispatch(getOrders(token, userId))
            
        })
        .catch(error  => {
            dispatch(ordersFail(error))
        })
    }
}