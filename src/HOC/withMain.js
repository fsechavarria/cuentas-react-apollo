import React, { Suspense } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import { mainStyle } from '../styles/styles'

import history from '../utils/history'
import { signOut } from '../actions/login'
import Snackbar from '../components/Snackbar'
import Sidebar from '../components/Layout/Sidebar'

import LinearProgress from '@material-ui/core/LinearProgress'

function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={<LinearProgress />}>
      <Component {...props} />
    </Suspense>
  )
}

// If allowedRoles is not specified then every role is allowed.
export const withMain = (WrappedComponent, allowedRoles = []) => {
  class Main extends React.Component {
    state = {
      open: false,
      variant: '',
      message: ''
    }

    componentWillMount() {
      const token = localStorage.getItem('token')
      const { auth } = this.props
      const { pathname } = history.location
      if (!token) {
        if (pathname !== '/login') {
          history.push('/login', { message: 'Por favor inicie sesión' })
        } else {
          history.push('/login')
        }
      } else if (
        token &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(auth.role)
      ) {
        // Redirects to home component if logged user role is not allowed
        history.push('/')
        this.openSnackBar('error', 'Acceso no autorizado')
      }
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }

      this.setState({ open: false })
    }

    openSnackBar = (variant, message) => {
      this.setState({ open: true, variant, message })
    }

    render() {
      const { classes, ...rest } = this.props
      const { pathname } = history.location
      const Component = WaitingComponent(WrappedComponent)
      return !/login/gi.test(pathname) ? (
        <div className={classes.root}>
          <Sidebar {...rest}>
            <Component {...rest} openSnackBar={this.openSnackBar} />
          </Sidebar>
          <Snackbar
            variant={this.state.variant}
            message={this.state.message}
            open={this.state.open}
            handleClose={this.handleClose}
          />
        </div>
      ) : (
        <React.Fragment>
          <WrappedComponent {...rest} openSnackBar={this.openSnackBar} />
          <Snackbar
            variant={this.state.variant}
            message={this.state.message}
            open={this.state.open}
            handleClose={this.handleClose}
          />
        </React.Fragment>
      )
    }
  }

  const mapStateToProps = ({ auth, status }) => {
    return { auth, status }
  }

  return connect(
    mapStateToProps,
    { signOut }
  )(withStyles(mainStyle)(Main))
}
