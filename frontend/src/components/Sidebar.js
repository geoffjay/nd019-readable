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

  const { classes, open, categories, toggleSidebar } = props
  console.log(categories)

  //return (<div>hi</div>)
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
            {/*
            {categories.map((category) => (
              <ListItem key={category.name} button>
                <ListItemIcon>
                  <LabelOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={category.path} />
              </ListItem>
            ))}
            */}
          </List>
        </div>
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  categories: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  // onSelectCategory: PropTypes.func.isRequired,
}

export default withStyles(styles)(Sidebar)
