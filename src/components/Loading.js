import React from 'react'
import CirculasProgress from '@material-ui/core/CircularProgress'

const Loading = props => {
  if (props.loading) {
    return <CirculasProgress size={80} />
  }

  if (props.error) {
    return <div>{props.error.message}</div>
  }

  return null
}

export default Loading
