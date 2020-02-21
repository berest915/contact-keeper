import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'

import AuthContext from '../../context/auth/authContext'

const Home = () => {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    // when the application loads, token is in storage when the page is refreshed
    // it's not getting removed, but it's not in state (stateless)
    authContext.loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}
export default Home
