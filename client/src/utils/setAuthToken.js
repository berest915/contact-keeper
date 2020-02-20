import axios from 'axios'

const setAuthToken = token => {
  if(token){
    axios.defaults.headers.common['x-auth-token'] = token
  }else{
    delete axios.defaults.headers.common['x-auth-token']
  }
}
export default setAuthToken
//! if token in LS, any axios req would have def header 'x-auth-token' with token value