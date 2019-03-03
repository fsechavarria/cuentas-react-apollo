import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { loginStyle } from '../styles/styles'
import { signIn } from '../actions/login'
import { Typography } from '@material-ui/core'

import isInitialLoad from '../utils/isInitialLoad'
import history from '../utils/history'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    if (window.performance) {
      if (performance.navigation.type !== 1) {
        this.checkAuth()
      }
    }
  }

  checkAuth = () => {
    const { pathname } = history.location
    const isInit = isInitialLoad(pathname)
    if (!isInit) {
      this.props.openSnackBar('error', 'Por favor inicie sesión')
      history.replace(history.location.pathname, undefined)
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.signIn({
      email: this.state.email,
      password: this.state.password
    })
    const { status } = this.props
    if (status.error) {
      this.props.openSnackBar('error', status.message)
    } else {
      history.push('/')
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={this.state.email}
                disabled={this.props.status.loading}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={this.state.password}
                disabled={this.props.status.loading}
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={this.props.status.loading}
            >
              {this.props.status.loading ? (
                <CircularProgress size={24} />
              ) : (
                'Ingresar'
              )}
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

const mapStateToProps = ({ auth, status }) => {
  return { auth, status }
}

export default connect(
  mapStateToProps,
  { signIn }
)(withStyles(loginStyle)(Login))
