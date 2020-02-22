import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
  const { filterContact, clearFilter, filtered } = useContext(ContactContext)
 
  const text = useRef('')

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  }, [filtered, text])

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContact(e.target.value)
    } else {
      clearFilter()
    }
  }

  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Filter Contacts .."
        onChange={onChange}
      />
    </form>
  )
}
export default ContactFilter
