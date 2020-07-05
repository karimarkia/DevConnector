import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../Store/actions/post'


const CommentsForm = ({postId,addComment}) => {
    const [text, setText] = useState('')

    const handelSubmit = e => {
        e.preventDefault()
        addComment(postId,{text})
        setText('')
    }

    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={e => handelSubmit(e)} >
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            placeholder="Create a post"
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>

      </div>
    )
}

CommentsForm.propTypes = {
addComment:PropTypes.func.isRequired,
}

export default connect(null,{addComment})(CommentsForm)
