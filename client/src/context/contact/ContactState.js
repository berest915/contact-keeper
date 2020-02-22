import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CONTACT_ERROR,
  CLEAR_FILTER
} from '../types'

const ContactState = (props) => {
  const initialState = {
    contacts: null,   // put null instead of [], to fix initial contactslist is empty returns notify msh
    current: null,
    filtered: null,
    error: null,
  }
  const [state, dispatch] = useReducer(ContactReducer, initialState)

  //get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts')
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // clear contacts
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    })
  }

  // add contact
  const addContact = async (contact) => {
    const config = {
      // Since headers.common[x-auth-token] is called if token in LS, noneed to set at here for body
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/contacts', contact, config)
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }
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
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    })
  }
  // filter contact
  const filterContact = (text) => {
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
        error: state.error,
        getContacts,
        clearContacts,
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
