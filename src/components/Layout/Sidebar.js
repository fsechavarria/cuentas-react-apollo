import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import BusinessIcon from '@material-ui/icons/Business'
import PersonIcon from '@material-ui/icons/Person'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Tooltip from '@material-ui/core/Tooltip'

import { sidebarStyle } from '../../styles/styles'
import history from '../../utils/history'

class Sidebar extends React.Component {
  state = { open: false }

  drawerMenu = [
    [
      {
        title: 'Ver Usuarios',
        icon: PersonIcon,
        roles: ['admin'],
        onClick: () => history.push('/users')
      }
    ],
    [
      {
        title: 'Ver Empresas',
        icon: BusinessIcon,
        roles: ['admin', 'user'],
        onClick: () => history.push('/business')
      },
      {
        title: 'Ver Cuentas',
        icon: WalletIcon,
        roles: ['admin', 'user'],
        onClick: () => history.push('/bills')
      }
    ],
    [
      {
        title: 'Cerrar Sesión',
        icon: LogoutIcon,
        roles: ['admin', 'user'],
        onClick: () => this.props.signOut()
      }
    ]
  ]

  componentWillMount() {
    const { auth } = this.props
    this.drawerMenu = this.drawerMenu
      .map((group, gindex) =>
        group
          .filter(item => (item.roles || []).indexOf(auth.role) > -1)
          .map((item, itemIndex) => {
            item.id = gindex + '_' + itemIndex
            return item
          })
      )
      .filter(group => group.length > 0)
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, theme } = this.props
    const { auth } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={`${classes.navColor} ${classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}`}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              onClick={() => history.push('/')}
            >
              Mis Cuentas
            </Typography>
            <AccountCircleIcon />
            {auth.isAuthenticated && (
              <span className={classes.marginAccount}>{auth.email}</span>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div
            className={classes.toolbar}
            onClick={this.handleDrawerClose}
            style={{ cursor: 'pointer' }}
          >
            <IconButton>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <div style={{ marginTop: '10px' }}>
            {this.drawerMenu.map((group, index) => (
              <List key={index}>
                {group.map(item => (
                  <ListItem button key={item.id} onClick={item.onClick}>
                    <Tooltip title={item.title} aria-label={item.title}>
                      <ListItemIcon>
                        <item.icon />
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </List>
            ))}
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default withStyles(sidebarStyle, { withTheme: true })(Sidebar)
