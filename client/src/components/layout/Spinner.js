import React, { Fragment } from 'react'
import spinner from './spinner.gif';

const Spinner = () =>
    <Fragment>
        <img src={spinner} alt="Loading..." style={spinnerStyle} />
    </Fragment>
    
const spinnerStyle = {
    width: '100px',
    margin: 'auto', 
    display: 'block',
    borderRadius: '50%'
}
export default Spinner