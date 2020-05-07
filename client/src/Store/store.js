import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import alertReducer from './reducers/alert'
import auth from './reducers/auth'
import profile from './reducers/profile'

const rootReducer = combineReducers({ alert : alertReducer, auth, profile })

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
