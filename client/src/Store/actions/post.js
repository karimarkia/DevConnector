import axios from 'axios'
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, REMOVE_POST, ADD_POST } from './types'
import { setAlert } from './alert'

// GET posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts')
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add Like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
// Remove Like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
// remove post
export const removePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`)
    dispatch({
      type: REMOVE_POST,
      payload: id,
    })
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res =await axios.post(`/api/posts` ,formData, config)
    dispatch({
      type: ADD_POST,
      payload: res.data,
    })
    dispatch(setAlert('Post added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
