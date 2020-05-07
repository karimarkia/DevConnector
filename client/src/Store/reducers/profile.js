import { GET_PROFILE, PROFILE_ERROR } from '../actions/types'

const initalState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
}

const profile = (state = initalState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export default profile
