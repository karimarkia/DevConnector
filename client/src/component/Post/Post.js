import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost } from '../../Store/actions/post'
import Spinner from '../Layout/Spinner'
import PostItem from '../Posts/PostItem'
import CommentsForm from './CommentsForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, match, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost])

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn">
        Back to posts
      </Link>
      <PostItem post={post} showItems={false} />
      <CommentsForm postId={post._id} />
      <div className="comments">
        {post.comments.map(comment=> (
          <CommentItem key={comment._id} postId={post._id} comment={comment} />
        ))}
      </div>
    </>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
  }
}

export default connect(mapStateToProps, { getPost })(Post)
