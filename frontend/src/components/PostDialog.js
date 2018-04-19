import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import { TextField } from 'redux-form-material-ui'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  postField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
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

const propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  categories: PropTypes.object.isRequired,
  postData: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

let PostDialog = (props) => {

  const {
    classes,
    open,
    categories,
    postData,
    handleSubmit,   // This is added by redux-form
    onSubmit,
    onCancel,
  } = props

  const category = postData
    ? postData.category
    : categories.data && categories.data[0].name

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">
          {postData ? 'Edit Post' : 'Create Post'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {postData ? 'Modify the post content.' : 'Create a new post.'}
          </DialogContentText>
          <Field
            name="title"
            component={TextField}
            autoFocus
            margin="normal"
            id="title"
            className={classes.textField}
            label="Title"
            type="text"
            required={true}
            fullWidth
          />
          {!postData &&
            <div>
              <Field
                name="author"
                component={TextField}
                margin="normal"
                id="author"
                className={classes.textField}
                label="Author"
                type="text"
                required={true}
                fullWidth
              />
              <Field
                name="category"
                component={TextField}
                margin="normal"
                id="category"
                select
                className={classes.menuField}
                value={category}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu,
                  }
                }}
                helperText="Select a category"
              >
                {categories.data && categories.data.map(option => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </Field>
            </div>
          }
          <Field
            name="body"
            component={TextField}
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
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

PostDialog.propTypes = propTypes

const selector = formValueSelector('post')

PostDialog = connect(state => ({
  post: selector(state, 'post'),
}))(PostDialog)

export default reduxForm({
  form: 'post',
  fields: ['title', 'author', 'category', 'body'],
})(withStyles(styles)(PostDialog))
