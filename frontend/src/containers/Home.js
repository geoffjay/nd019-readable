import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import PostList from '../components/PostList'
import PostDialog from '../components/PostDialog'
import { fetchCategories } from '../store/categories/actions'

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
    sidebarOpen: false,
    postDialogOpen: false,
  }

  toggleSidebar = (open) => () => {
    this.setState({
      sidebarOpen: open,
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
    this.closePostDialog()
  }

  componentDidMount() {
    this.props.loadCategories()
  }

  // TODO: Filter posts using category and pass to list
  render() {
    const { classes, categories } = this.props

    console.log(this.props)

    return (
      <div>
        <Navbar toggleSidebar={this.toggleSidebar} />
        <Sidebar
          open={this.state.sidebarOpen}
          categories={categories}
          toggleSidebar={this.toggleSidebar}
        />
        <PostList />
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
          onCancel={this.closePostDialog}
          onSubmit={this.submitPost}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categoriesByName,
})

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(fetchCategories()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home))
