import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../Store/actions/post'

const PostForm = ({addPost}) => {
    const [text, setText] = useState('')

    const handelSubmit = e => {
        e.preventDefault()
        addPost({text})
        setText('')
    }

    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
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

PostForm.propTypes = {
addPost : PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm)
