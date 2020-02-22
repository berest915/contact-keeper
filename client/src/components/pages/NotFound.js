import React, { Fragment, useEffect } from 'react'
import { useContext } from 'react'
import authContext from '../../context/auth/authContext'

export default () => {
  const { loadUser } = useContext(authContext)

  useEffect(() => {
    if (localStorage.token) {
      loadUser()
    }
  }, [])

  return (
    <Fragment>
      <h1>404 Not Found</h1>
      <p className="lead">Page that you had entered - - not exist</p>
    </Fragment>
  )
}
