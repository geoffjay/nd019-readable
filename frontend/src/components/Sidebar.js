import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ListIcon from 'material-ui-icons/List'
import LabelOutlineIcon from 'material-ui-icons/LabelOutline'
import { capitalize } from '../utils/helpers'

const styles = theme => ({
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
  },
})

const propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  categories: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
}

const Sidebar = (props) => {

  const { classes, open, categories, toggleSidebar, selectCategory } = props

  return (
    <Drawer open={open} onClose={toggleSidebar(false)}>
      <div
        tabIndex={0}
        role="button"
        onClick={toggleSidebar(false)}
        onKeyDown={toggleSidebar(false)}
      >
        <div className={classes.list}>
          <ListItem>
            <Avatar>
              <ListIcon />
            </Avatar>
            <ListItemText primary="Readable" secondary="Categories" />
          </ListItem>
          <Divider />
          <List>
            <Link
              key={'all'}
              className={classes.link}
              to={'/'}
            >
              <ListItem button onClick={selectCategory('all')}>
                <ListItemIcon>
                  <LabelOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={'All'} />
              </ListItem>
            </Link>
            <Divider />
            {categories.data && categories.data.map((category) => (
              <Link
                key={category.name}
                className={classes.link}
                to={category.name}
              >
                <ListItem button onClick={selectCategory(category.name)}>
                  <ListItemIcon>
                    <LabelOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={capitalize(category.path)} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = propTypes

export default withStyles(styles)(Sidebar)
