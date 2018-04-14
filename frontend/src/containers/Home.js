import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import PostList from '../components/PostList'
import PostDialog from '../components/PostDialog'
import { fetchCategories } from '../store/categories/actions'
import { createPost } from '../store/posts/actions'

const styles = theme => ({
  button: {
    position: 'fixed',
    right: 25,
    bottom: 25,
    margin: theme.spacing.unit,
  },
})

class Home extends Component {

  state = {
    selectedCategory: 'all',
    sidebarOpen: false,
    postDialogOpen: false,
  }

  componentDidMount() {
    this.props.loadCategories()
  }

  toggleSidebar = (open) => () => {
    this.setState({
      sidebarOpen: open,
    })
  }

  selectCategory = (category) => () => {
    this.setState({
      selectedCategory: category,
    })
  }

  openPostDialog = () => {
    this.setState({
      postDialogOpen: true,
    })
  }

  closePostDialog = () => {
    this.setState({
      postDialogOpen: false,
    })
  }

  submitPost = (post) => {
    console.log(post)
    /* TODO: Use redux-form-material-ui */
    const newPost = {
    	title:"balls",
    	body:"benoit",
    	author:"supes balls",
    	category:"udacity"
    }
    console.log(newPost)
    this.props.createPost(newPost)
    this.closePostDialog()
  }

  // TODO: Filter posts using category and pass to list
  render() {
    const { classes, categories } = this.props

    return (
      <div>
        <Navbar toggleSidebar={this.toggleSidebar} />
        <Sidebar
          open={this.state.sidebarOpen}
          categories={categories}
          toggleSidebar={this.toggleSidebar}
          selectCategory={this.selectCategory}
        />
        <PostList category={this.state.selectedCategory} />
        <Button
          variant="fab"
          color="secondary"
          className={classes.button}
          onClick={this.openPostDialog}
        >
          <AddIcon />
        </Button>
        <PostDialog
          open={this.state.postDialogOpen}
          categories={categories}
          onCancel={this.closePostDialog}
          onSubmit={this.submitPost}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
})

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(fetchCategories()),
  createPost: (post) => dispatch(createPost(post)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home)))
