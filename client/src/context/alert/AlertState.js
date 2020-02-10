import React, { useReducer } from 'react'
import uuid from 'uuid'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = (props) => {
    const initialState = []
    const [state, dispatch] = useReducer(AlertReducer, initialState)

    // set alert
    const setAlert = (msg, type, timeOut = 2000) => {
        const id = uuid.v4()
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeOut)
    }
    // remove alert
    const removeAlert = () => {

    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert,
                removeAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}
export default AlertState