import { LOGIN, LOGOUT, LOADING, ERROR } from './types'
import client from '../apollo/client'
import { login } from '../queries/auth'
import history from '../utils/history'

export const signIn = formData => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING })
      const response = await client.query({
        query: login,
        variables: formData
      })
      const { token } = response.data.login
      localStorage.setItem('token', token)
      return dispatch({
        type: LOGIN,
        payload: response.data.login
      })
    } catch (err) {
      return dispatch({
        type: ERROR,
        payload: err.message
      })
    }
  }
}

export const signOut = () => dispatch => {
  history.push('/login')
  return dispatch({ type: LOGOUT })
}
