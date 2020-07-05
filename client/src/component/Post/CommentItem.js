import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { removeComment } from '../../Store/actions/post'

const CommentItem = ({
  postId,
  comment: { _id, name, avatar, user, date, text },
  auth,
  removeComment,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

      {!auth.loading && user === auth.user._id && (
          
          <button
          onClick={e=> removeComment(_id,postId)}
          className="btn btn-danger"
          type='button'
          >
            <i className="fas fa-times" />
          </button>
        
        )}
        </div>
    </div>
  )
}

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { removeComment })(CommentItem)
