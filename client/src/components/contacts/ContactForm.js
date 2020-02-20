import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
  const contactContext = useContext(ContactContext)
  const { addContact, current, clearCurrent, updateContact } = contactContext

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  })
  const { name, email, phone, type } = contact

  useEffect(() => {
    if (current !== null) {
      //! after Edit btn from ContactForm.js trigger setCurrent()
      //! >>  current-contact set to local-contact
      setContact(current)
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      })
    }
  }, [contactContext, current])

  const onChange = (e) =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    })

  const onSubmit = (e) => {
    e.preventDefault()
    //! check if update instead of add
    if (current !== null) {
      //* if current is used as arg, the current actually carrying unedited contact
      updateContact(contact)
    } else {
      addContact(contact)
    }
    clearAll()
  }

  const clearAll = () => clearCurrent()

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        value={phone}
        placeholder="Phone"
        onChange={onChange}
      />
      {/*//! radios */}
      <h4>Contact-Type</h4>
      <input
        type="radio"
        id="personal"
        style={rem25}
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />
      <label htmlFor="personal" style={rem50}>
        Personal
      </label>{' '}
      <input
        type="radio"
        id="professional"
        style={rem25}
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />
      <label htmlFor="professional" style={rem50}>
        Professional
      </label>
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  )
}
const rem50 = {
  marginRight: '0.5rem'
}
const rem25 = {
  marginRight: '0.25rem'
}
export default ContactForm
