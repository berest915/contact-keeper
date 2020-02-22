import React, { useContext, useEffect } from 'react'
import authContext from '../../context/auth/authContext'

const About = () => {
  const { loadUser } = useContext(authContext)

  useEffect(() => {
    if (localStorage.token) {
      loadUser()
    }
  }, [])

  return (
    <div>
      <h1>About this App</h1>
      <p className="my-1">This is full-stack React App to manage contacts</p>
      <p className="bg-dark p">
        <strong>Version </strong>0.0.0 v1
      </p>
    </div>
  )
}
export default About
