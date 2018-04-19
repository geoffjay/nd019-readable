import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'

const styles = theme => ({
  nav: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  backButton: {
    marginLeft: -12,
    marginRight: 12,
  },
})

const propTypes = {
  classes: PropTypes.object.isRequired,
}

const PostNavbar = (props) => {

  const { classes } = props

  return (
    <div className={classes.nav}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.backButton}
            color="inherit"
            component={Link}
            to="/"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Detail
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

PostNavbar.propTypes = propTypes

export default withStyles(styles)(PostNavbar)
