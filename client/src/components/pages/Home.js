import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'

import AuthContext from '../../context/auth/authContext'

const Home = () => {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    // return 401 whenever direct to / which re-render this component
    // then loaduser dispatch AUTH_ERROR
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
