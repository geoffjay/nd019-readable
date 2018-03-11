import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    // width: 200,
  },
  postField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    // width: 400,
  },
  menuField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
})

const PostDialog = (props) => {

  const { classes, open, onSubmit, onCancel } = props

  const categories = [
    { name: 'react' },
    { name: 'redux' },
    { name: 'udacity' },
  ]

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new post.
        </DialogContentText>
        <TextField
          autoFocus
          margin="normal"
          id="title"
          className={classes.textField}
          label="Title"
          type="text"
          required={true}
          fullWidth
        />
        <TextField
          margin="normal"
          id="author"
          className={classes.textField}
          label="Author"
          type="text"
          required={true}
          fullWidth
        />
        <TextField
          margin="normal"
          id="category"
          select
          label="Category"
          className={classes.menuField}
          value={categories[0].name}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            }
          }}
          helperText="Select a category"
        >
          {categories.map(option => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </TextField>
        <TextField
          margin="normal"
          id="body"
          label="Post"
          className={classes.postField}
          type="text"
          multiline={true}
          rows={4}
          rowsMax={8}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

PostDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(PostDialog)
