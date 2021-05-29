import { combineReducers } from 'redux'

import alert from './alert'
import auth from './auth'
import { users } from './users'
import { messages } from './messages'

export default combineReducers({
  alert,
  auth,
  users,
  messages,
})
