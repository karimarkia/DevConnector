import axios from 'axios'
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types'
import { setAlert } from './alert'

// Get User Profile If Exist
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Create a Profile For A User
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post('/api/profile', formData, config)
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

    if (!edit) {
      history.push('/dashboard')
    }
  } catch (err) {
    const errors = err.response.data.error
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.put('/api/experience', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Experience added', 'success'))
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.error
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
// Add Education
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.put('/api/education', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Education added', 'success'))
    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.error
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
