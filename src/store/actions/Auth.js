import * as actionTypes from './actionTypes';
import axios from 'axios';
import {apiKey} from '../../env'

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
         if (!isSignUp)
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        axios.post(url + apiKey, authData)
        .then(response => {
            const expirationDate = Date.now() + response.data.expiresIn * 1000
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const expiration  = localStorage.getItem('expirationDate')
        if(token && expiration > Date.now()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout(expiration - Date.now()/1000))
            } else{
                dispatch(logout())
            }
            
            
        }
    }
