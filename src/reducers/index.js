import { combineReducers } from 'redux'

import login from './login'
import status from './status'

export default combineReducers({
  auth: login,
  status
})
