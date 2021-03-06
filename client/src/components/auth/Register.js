import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)
  const { registerUser, isAuth, clearError, error, loadUser } = authContext
  const { setAlert } = alertContext

  useEffect(() => {
    if (localStorage.token) {
      loadUser()
    }
    if (isAuth) {
      // redirect
      props.history.push('/')
    }
    // it should not be string-specific
    if (error) {
      setAlert(error, 'danger')
      clearError()
    }
    // eslint-disable-next-line
  }, [error, isAuth, props.history])
  //? if add clearError || setAlert as dep may cause infinite loop
  //? is that any fn call shouldn't be dep ?

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = user

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger')
    } else if (password !== password2) {
      setAlert('Password is not matched', 'danger')
    } else {
      registerUser({
        name,
        email,
        password
      })
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            // minLength="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Register"
        />
      </form>
    </div>
  )
}
export default Register
