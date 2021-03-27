import * as actionTypes from './actionTypes';
import axios from 'axios';
import {apiKey} from '../../env'

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email,
            password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey, authData)
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err))
        })
    }
}