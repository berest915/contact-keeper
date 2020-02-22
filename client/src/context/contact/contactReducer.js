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

export default (state, action) => {
  switch (action.type) {
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null
      }
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      }
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        new1: 'ss',
        filtered:
          state.filtered !== null ? [action.payload, ...state.filtered] : null,
        loading: false
      }

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.map((filteredContact) =>
                filteredContact._id === action.payload._id
                  ? action.payload
                  : filteredContact
              )
            : null,
        loading: false
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload._id
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.filter(
                (filteredContact) => filteredContact._id !== action.payload._id
              )
            : null,
        loading: false
      }
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const replaceText = action.payload.replace(/[^a-zA-Z0-9_-]/g, '')
          const regex = new RegExp(`${replaceText}`, 'gi')
          return contact.name.match(regex) || contact.email.match(regex)
        })
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }

    default:
      return state
  }
}
