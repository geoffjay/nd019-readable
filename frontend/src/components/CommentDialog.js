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
  commentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
})

const propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  commentData: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

let CommentDialog = (props) => {

  const {
    classes,
    open,
    commentData,
    handleSubmit,   // This is added by redux-form
    onSubmit,
    onCancel
  } = props

  const disabled = commentData ? true : false
  const author = commentData ? commentData.author : ''
  const body = commentData ? commentData.body : ''

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">
          {commentData ? 'Edit Comment' : 'Create Comment'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {commentData ? 'Modify the post content.' : 'Create a new post.'}
          </DialogContentText>
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
            disabled={disabled}
            defaultValue={author}
          />
          <Field
            name="body"
            component={TextField}
            margin="normal"
            id="body"
            label="Comment"
            className={classes.commentField}
            type="text"
            multiline={true}
            rows={4}
            rowsMax={8}
            fullWidth
            defaultValue={body}
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

CommentDialog.propTypes = propTypes

const selector = formValueSelector('comment')

CommentDialog = connect(state => ({
  comment: selector(state, 'comment')
}))(CommentDialog)

export default reduxForm({
  form: 'comment',
  fields: ['author', 'body'],
})(withStyles(styles)(CommentDialog))
