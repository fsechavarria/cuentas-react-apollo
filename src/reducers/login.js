import { LOGIN, LOGOUT } from '../actions/types'

const initialState = {
  userId: '',
  email: '',
  role: '',
  isAuthenticated: false
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LOGIN:
      return {
        ...state,
        email: payload.email,
        userId: payload.userId,
        role: payload.role,
        isAuthenticated: true
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...initialState
      }
    default:
      return state
  }
}
