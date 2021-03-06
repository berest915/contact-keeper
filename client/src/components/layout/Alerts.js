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
            {/* //* if more than 1 alert message */}

            {!Array.isArray(alert.msg) ? (
              <Fragment>
                <i className="fas fa-info-circle" style={iStyle}></i>
                {alert.msg}
              </Fragment>
            ) : (
              <Fragment>
                {alert.msg.length > 1 ? (
                  <Fragment>
                    {alert.msg.map((each_msg, index) => (
                      // * When don’t have stable IDs for rendered items, use index as a key
                      <div key={index}>
                        <i className="fas fa-info-circle" style={iStyle}></i>{' '}
                        {each_msg}
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <Fragment>
                    <i className="fas fa-info-circle" style={iStyle}></i>{' '}
                    {alert.msg}
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        ))}
    </Fragment>
  )
}
const iStyle = {
  marginRight: '1rem'
}
export default Alerts
