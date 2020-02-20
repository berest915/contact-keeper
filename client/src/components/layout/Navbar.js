import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthContext from '../../context/auth/authContext'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)
  const { isAuth, logoutUser, user } = authContext

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href="#!">
          <i className="fas fa-sign-out-alt" style={{marginRight: '5rem'}}>
            <span className="hide-sm">Logout</span>
          </i>
        </a>
      </li>
    </Fragment>
  )
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  )

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} style={{ marginRight: '1rem' }} />
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {isAuth ? authLinks : guestLinks}
      </ul>
    </div>
  )
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}
Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
}
export default Navbar
