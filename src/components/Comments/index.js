import {v4 as uuid} from 'uuid'
import {Component} from 'react'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state

    const initialClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    }`

    const newComment = {
      id: uuid(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeComment = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  onChangeName = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div>
        <div className="main-container">
          <div className="Comment-input-container">
            <h1 className="heading">Comments</h1>
            <form
              className="comments-form-container"
              onSubmit={this.onAddComment}
            >
              <p className="desc">Say Something about 4.0 Technologies</p>
              <input
                value={nameInput}
                onChange={this.onChangeName}
                className="input"
                placeholder="Your Name"
              />
              {/* Replaced input with textarea for comment */}
              <textarea
                value={commentInput}
                onChange={this.onChangeComment}
                className="input"
                placeholder="Your Comment" // Placeholder as required
              />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
        </div>
        <hr className="line" />
        <div className="adding-comment-container">
          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>{' '}
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
