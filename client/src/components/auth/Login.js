import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { loginUser, isAuth, clearError, error } = authContext

  useEffect(() => {
    if (isAuth) {
      // redirect
      props.history.push('/')
    }
    if (!!error) {
      setAlert(error, 'danger')
      clearError()
    }
    // eslint-disable-next-line
  }, [error, isAuth, props.history]) //if add clearError || setAlert cause infinite loop

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { email, password } = user

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (email === '') {
      setAlert('please fill in the fields', 'danger')
    } else {
      loginUser({
        email,
        password
      })
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength = '5'
            required
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Login"
        />
      </form>
    </div>
  )
}
export default Login
