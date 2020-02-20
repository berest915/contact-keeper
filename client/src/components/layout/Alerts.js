import React, { useContext, Fragment } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alerts = () => {
  const { alerts } = useContext(AlertContext)
  // console.log(Array.isArray(alerts[0]));
  // console.log(alerts)

  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.msg.length > 1 ? (
              <Fragment>
                {alert.msg.map((each_msg, index) => (
                  //* When don’t have stable IDs for rendered items, use index as a key
                  <div key={index}>
                    <i className="fas fa-info-circle"></i> {each_msg}
                  </div>
                ))}
              </Fragment>
            ) : (
              <Fragment>
                <i className="fas fa-info-circle"></i> {alert.msg}
              </Fragment>
            )}
          </div>
        ))}
    </Fragment>
  )
}

// <div key={alert.id} className={`alert alert-${alert.type}`}>
//   {alert.msg.length > 1 ? {
//     for(let i=0;i<alert.msg.length;i++){
//       <i className="fas fa-info-circle"></i> {alert.msg[i]}
//       <br/>
//     }

export default Alerts
// dispatch({
//   type: SET_ALERT,
//   payload: { msg, type, id }
// })
