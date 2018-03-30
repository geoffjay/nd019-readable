import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import Avatar from 'material-ui/Avatar'

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
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
    width: 'auto',
  }),
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
})

const Post = (props) => {

  const { classes, match } = props
  console.log(match)

  const post = { author: 'balls' }

  return (
    <div>
      <div className={classes.nav}>
        <AppBar>
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
      <div>
        <Paper className={classes.paper} elevation={4}>
          <Avatar aria-label="User" className={classes.avatar}>
            {post.author[0] && post.author[0].toUpperCase()}
          </Avatar>
          <Typography variant="headline" component="h3">
            This is a sheet of paper.
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>
      </div>
    </div>
  )
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Post)
