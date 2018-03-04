import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Sidebar from './Sidebar'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

class Navbar extends Component {
  state = {
    opened: false,
  }

  toggleSidebar = (open) => () => {
    this.setState({
      opened: open,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleSidebar(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Readable
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar
          open={this.state.opened}
          toggleSidebar={this.toggleSidebar}
        />
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  // categories: PropTypes.array.isRequired,
}

export default withStyles(styles)(Navbar)
