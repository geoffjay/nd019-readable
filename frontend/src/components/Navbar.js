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
import Menu, { MenuItem } from 'material-ui/Menu'

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

const propTypes = {
  classes: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  selectSort: PropTypes.func.isRequired,
}

class Navbar extends Component {

  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleSelect = (sortBy) => {
    const { selectSort } = this.props
    selectSort(sortBy)
    this.handleClose()
  }

  render() {
    const { classes, toggleSidebar } = this.props
    const { anchorEl } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={toggleSidebar(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Readable
            </Typography>
            <Button
              color="inherit"
              aria-owns={anchorEl ? 'sort-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              Sort by
              <ExpandIcon />
            </Button>
            <Menu
              id="sort-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={() => this.handleSelect('popularity')}>
                Popularity
              </MenuItem>
              <MenuItem onClick={() => this.handleSelect('date')}>
                Date
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = propTypes

export default withStyles(styles)(Navbar)
