import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reset } from 'redux-form'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import PostList from '../components/PostList'
import PostDialog from '../components/PostDialog'
import { fetchCategories } from '../store/categories/actions'
import { createPost } from '../store/posts/actions'
import store from '../store'

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
    sortBy: 'popularity',
  }

  /**
   * @description Fetch the list of categories from the API service.
   */
  componentDidMount() {
    const { categories, history, match } = this.props

    /*
     *console.log(`Searching for ${match.params.category}`)
     *console.log(categories)
     *console.log(Object.values(categories))
     */

    if (Object.values(categories).includes(this.state.selectedCategory) ||
        match.params.category === undefined) {
      this.setState({
        selectedCategory: match.params.category ? match.params.category : 'all'
      })
    } else {
      history.push('/error')
    }
  }

  /**
   * @description Open the categories selection sidebar.
   * @param {bool} sidebarOpen - `true' to open, `false' to close
   */
  toggleSidebar = (open) => () => {
    this.setState({
      sidebarOpen: open,
    })
  }

  /**
   * @description Assign a category selection.
   * @param {string} category - Category selection filter
   */
  selectCategory = (category) => () => {
    this.setState({
      selectedCategory: category,
    })
  }

  /**
   * @description Assign a sort selection.
   * @param {string} sortBy - Sort by selection to order posts by
   */
  selectSort = (sortBy) => {
    this.setState({
      sortBy: sortBy,
    })
  }

  /**
   * @description Open the dialog modal to create a new post.
   */
  openPostDialog = () => {
    this.setState({
      postDialogOpen: true,
    })
  }

  /**
   * @description Close the dialog modal after the post submission.
   */
  closePostDialog = () => {
    this.setState({
      postDialogOpen: false,
    })
  }

  /**
   * @description Create a new post by submitting to the API.
   * @param {object} post - The post to submit to the server
   */
  submitPost = values => {
    // FIXME: The default value for the select field doesn't come through
    const category = (values.category === undefined)
      ? 'react'
      : values.category
    const post = {
      title: values.title,
      body: values.body,
      author: values.author,
      category: category,
    }
    this.props.createPost(post)
    // Tried every method at:
    // https://github.com/erikras/redux-form/blob/master/docs/faq/HowToClear.md
    // this was the only one that worked, it seems like the worst option
    store.dispatch(reset('post'))
    this.closePostDialog()
  }

  render() {
    const { classes, categories } = this.props

    return (
      <div>
        <Navbar
          toggleSidebar={this.toggleSidebar}
          selectSort={this.selectSort}
        />
        <Sidebar
          open={this.state.sidebarOpen}
          categories={categories}
          toggleSidebar={this.toggleSidebar}
          selectCategory={this.selectCategory}
        />
        <PostList
          category={this.state.selectedCategory}
          sortBy={this.state.sortBy}
        />
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
