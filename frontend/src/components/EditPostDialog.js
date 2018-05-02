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
import { Typography } from 'material-ui/Typography'
import { updatePost } from '../store/posts/actions'
import styles from '../forms.css'

const propTypes = {
  open: PropTypes.bool.isRequired,
  postData: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class EditPostDialog extends Component {

  state = { once: true }

  update = () => {
    if (this.props.postData && this.state.once) {
      const initData = {
        author: this.props.postData.author,
        title: this.props.postData.title,
        body: this.props.postData.body,
      }
      this.props.initialize(initData)
      this.setState({ once: false })
    }
  }

  render() {
    const {
      open,
      handleSubmit,   // This is added by redux-form
      onSubmit,
      onCancel,
    } = this.props

    if (this.props.postData) {
      this.update()
    }

    return (
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">
            Edit Post
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modify the post content.
            </DialogContentText>
            <Field
              name="title"
              component="input"
              margin="normal"
              id="title"
              className={styles.postTitle}
              label="Title"
              type="text"
              autoFocus={true}
            />
            <Field
              name="author"
              component="input"
              margin="normal"
              id="author"
              className={styles.postAuthor}
              label="Author"
              type="text"
              disabled={true}
            />
            <Field
              name="body"
              component="input"
              margin="normal"
              id="body"
              label="Post"
              className={styles.postBody}
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

EditPostDialog.propTypes = propTypes

const selector = formValueSelector('editPost')

EditPostDialog = connect(state => ({
  post: selector(state, 'editPost'),
  form: state.form,
}), dispatch => ({
  updatePost: (post) => dispatch(updatePost(post)),
}))(EditPostDialog)

export default reduxForm({
  form: 'editPost',
  fields: ['title', 'author', 'category', 'body'],
  enableReinitialize: true,
})(EditPostDialog)
