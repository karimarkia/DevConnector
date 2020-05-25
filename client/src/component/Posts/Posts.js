import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../Store/actions/post'


const Posts = ({getPosts, post : {posts, loading}}) => {
    return (
        <div>
            
        </div>
    )
}

Posts.propTypes = {
getPosts : PropTypes.func.isRequired,
post:PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        post : state.post
    }
}

export default connect(mapStateToProps,{getPosts})(Posts)
