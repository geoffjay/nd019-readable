import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ListIcon from 'material-ui-icons/List'
import LabelOutlineIcon from 'material-ui-icons/LabelOutline'

const styles = {
  list: {
    width: 250,
  }
}

const Sidebar = (props) => {

  const { classes, open, toggleSidebar } = props

  const categories = [
    { id: 'cat1', text: 'Test 1' },
    { id: 'cat2', text: 'Test 2' },
    { id: 'cat3', text: 'Test 3' },
  ]

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
            {categories.map((category) => (
              <ListItem key={category.id} button>
                <ListItemIcon>
                  <LabelOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={category.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  // onSelectCategory: PropTypes.func.isRequired,
}

export default withStyles(styles)(Sidebar)
