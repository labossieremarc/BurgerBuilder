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
    return dispatch => {
        dispatch(getOrdersStart())
        axios.get('/orders.json')
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

export const deleteOrder =(id) => {

    return dispatch => {
        axios.delete('./orders/' + id + '.json')
        .then(response => {
            
        })
        .catch(error  => {
            dispatch(ordersFail(error))
        })
    }
}