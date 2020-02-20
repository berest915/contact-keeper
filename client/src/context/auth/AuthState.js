import React, { useReducer } from 'react'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERROR
} from '../types'

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuth: null,
    loading: true,
    user: null,
    error: null
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // load user
  const loadUser = async () => {
    //! load token into default headers
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/api/auth')
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // register user
  const registerUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      //! we have 'proxy' value in package.json so that no need to enter localhost:PORT for reqs we made
      const res = await axios.post('/api/users', formData, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })
    }
  }

  // login user
  const loginUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      //! we have 'proxy' value in package.json so that no need to enter localhost:PORT for reqs we made
      const res = await axios.post('/api/auth', formData, config)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      })
    }
  }
  // logout user
  const logoutUser = () => {}
  // clear errors
  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        loadUser,
        loginUser,
        logoutUser,
        clearError
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthState
