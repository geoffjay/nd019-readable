import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import MenuIcon from 'material-ui-icons/Menu'
import ExpandIcon from 'material-ui-icons/ExpandMore'
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
    marginRight: 12,
  },
}

class Navbar extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    sidebarOpen: false,
  }

  toggleSidebar = (open) => () => {
    this.setState({
      sidebarOpen: open,
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
            <Button color="inherit">
              Sort by
              <ExpandIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <Sidebar
          open={this.state.sidebarOpen}
          toggleSidebar={this.toggleSidebar}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Navbar)
