import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'
import { updateComment } from '../store/comments/actions'
import styles from '../forms.css'

const propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class EditCommentDialog extends Component {

  state = { once: true }

  /**
   * @description This is the wrong way to do this, but handling forms in react
   * is ridiculous and I've given up on trying to do it right.
   */
  update = () => {
    if (this.props.selectedComment && this.state.once) {
      const initData = {
        author: this.props.selectedComment.author,
        body: this.props.selectedComment.body,
      }
      this.props.initialize(initData)
      this.setState({ once: false })
    }
  }

  /**
   * @description This is such a lame hack to read the form from the state this
   * way, but after fighting with redux-form for way too long this works, so
   * here it is.
   */
  submitComment = values => {
    const { updateComment, selectedComment, form } = this.props
    const newComment = {
      ...selectedComment,
      body: form.editComment.values.body,
    }

    updateComment({ comment: newComment })
    this.props.onCancel()

    this.setState({ selectedComment: undefined })
  }

  render() {
    const {
      open,
      handleSubmit,   // This is added by redux-form
      onCancel,
    } = this.props

    if (this.props.selectedComment) {
      this.update()
    }

    return (
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit(this.submitComment)}>
          <DialogTitle id="form-dialog-title">
            Edit Comment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modify the post content.
            </DialogContentText>
            <Typography component="p">
              Author:
            </Typography>
            <Field
              name="author"
              component="input"
              margin="normal"
              id="author"
              className={styles.commentAuthor}
              label="Author"
              type="text"
              disabled={true}
            />
            <Typography component="p">
              Comment:
            </Typography>
            <Field
              name="body"
              component="input"
              margin="normal"
              id="body"
              label="Comment"
              className={styles.commentBody}
              autoFocus={true}
              type="text"
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
}

EditCommentDialog.propTypes = propTypes

const selector = formValueSelector('editComment')

EditCommentDialog = connect(state => ({
  comment: selector(state, 'editComment'),
  selectedCommentId: state.comments.selectedCommentId,
  selectedComment: state.comments.selectedComment,
  form: state.form,
}), dispatch => ({
  updateComment: (comment) => dispatch(updateComment(comment)),
}))(EditCommentDialog)

export default reduxForm({
  form: 'editComment',
  fields: ['author', 'body'],
  enableReinitialize: true,
})(EditCommentDialog)
