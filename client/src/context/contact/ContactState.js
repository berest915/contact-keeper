import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types'

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'tuna',
                email: '222@gmail.com',
                phone: '222-222',
                type: 'professional'
            },
            {
                id: 2,
                name: 'bacon',
                email: '000@gmail.com',
                phone: '000-000',
                type: 'personal'
            },
            {
                id: 3,
                name: 'alex',
                email: 'alex@gmail.com',
                phone: '119-119',
                type: 'professional'
            },
        ],
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState)

    // add contact
    const addContact = (contact) => {
        contact.id = uuid.v4()
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
    }
    // delete contact
    const deleteContact = (id) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    }
    // set current contact
    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }
    // clear current contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }
    // update contact
    const updateContact = contact => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }
    // filter contact
    const filterContact = text => {
        dispatch({
            type: FILTER_CONTACT,
            payload: text
        })
    }
    // clear filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContact,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}
export default ContactState