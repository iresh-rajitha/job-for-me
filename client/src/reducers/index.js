import { combineReducers } from 'redux'

import { users } from './users'
import { messages } from './messages'
import { gigs } from './gigs'

export default combineReducers({
  users,
  messages,
  gigs,
})
