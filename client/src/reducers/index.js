import { combineReducers } from 'redux'

import alert from './alert'
import auth from './auth'
import { users } from './users'
import { messages } from './messages'
import { gigs } from './gigs'

export default combineReducers({
  alert,
  auth,
  users,
  messages,
  gigs,
})
