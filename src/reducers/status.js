import { LOADING, ERROR } from '../actions/types'

const initialState = {
  loading: false,
  error: false,
  message: ''
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LOADING:
      return { ...state, loading: true }
    case ERROR:
      return { ...state, loading: false, error: true, message: payload }
    default:
      return { ...initialState }
  }
}
