import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import alertReducer from './reducers/alert'
import auth from './reducers/auth'
import profile from './reducers/profile'
import post from './reducers/post'

const rootReducer = combineReducers({ alert : alertReducer, auth, profile, post})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
