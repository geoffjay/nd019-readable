import React, { Component } from 'react'
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

class EditCommentDialog extends Component {

  componentDidMount() {
    this.props.comments && this.handleInitialize()
  }

  handleInitialize() {
    const { comments, selectedCommentId } = this.props
    const initData = {
      "author": comments[selectedCommentId].author,
      "body": comments[selectedCommentId].body,
    }

    console.log(initData)

    this.props.initialize(initData)
  }

  renderAuthorField = () => {
    const { classes, comments, selectedCommentId } = this.props

    const data = (comments) ? comments[selectedCommentId] : undefined
    const author = data ? data.author : ''

    return (
      <TextField
        margin="normal"
        id="author"
        className={classes.textField}
        label="Author"
        type="text"
        fullWidth
        disabled={true}
        value={author}
      />
    )
  }

  renderBodyField = ({ input, children, ...custom }) => {
    const { classes, comments, selectedCommentId } = this.props

    const data = (comments) ? comments[selectedCommentId] : undefined
    const body = data ? data.body : ''

    return (
      <TextField
        margin="normal"
        id="body"
        label="Comment"
        className={classes.commentField}
        type="text"
        multiline={true}
        rows={4}
        rowsMax={8}
        fullWidth
        value={body}
        onChange={this.updateBody}
      />
    )
  }

  updateBody = (event) => {
    console.log(event.target.value)
    console.log(this.props)
    this.setState({ body: event.target.value })
  }

  render() {
    const {
      open,
      handleSubmit,   // This is added by redux-form
      onSubmit,
      onCancel,
      comments,
      selectedCommentId,
    } = this.props

    const data = (comments) ? comments[selectedCommentId] : undefined

    return (
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">
            Edit Comment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modify the post content.
            </DialogContentText>
            <Field
              name="author"
              component={this.renderAuthorField}
            />
            <Field
              name="body"
              component={this.renderBodyField}
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

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      author:
      state.comments.commentsByPost[state.comments.selectedCommentId].author,
      body:
      state.comments.commentsByPost[state.comments.selectedCommentId].body,
    },
    comments: state.comments.commentsByPost,
    selectedCommentId: state.comments.selectedCommentId,
  }
}

/*
 *EditCommentDialog = connect(state => ({
 *  comment: selector(state, 'editComment'),
 *  comments: state.comments.commentsByPost,
 *  selectedCommentId: state.comments.selectedCommentId,
 *}))(EditCommentDialog)
 */

export default reduxForm({
  form: 'comment',
  fields: ['author', 'body'],
  enableReinitialize: true,
}, mapStateToProps)(withStyles(styles)(EditCommentDialog))
