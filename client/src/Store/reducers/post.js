import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  REMOVE_POST,
  ADD_POST,
} from '../actions/types'

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
}

const post = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      }
    case REMOVE_POST:
      const removedPost = state.posts.filter((post) => post._id !== payload)
      return {
        ...state,
        posts: removedPost,
        loading: false,
      }
    case ADD_POST:
      return {
        ...state,
        // posts: payload,
        posts: [ payload, ...state.posts],
        loading: false,
      }

    default:
      return state
  }
}

export default post
