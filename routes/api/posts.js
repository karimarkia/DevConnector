const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Post = require('../../models/Posts')
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [auth, check('text', 'Text is require').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id)

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      })
      const post = await newPost.save()
      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).json('Server error')
    }
  }
)

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 })

    res.send(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error')
  }
})

// @route    GET api/posts/:id
// @desc     Get a post
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.send(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error')
  }
})

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }
    await post.remove()
    res.json({ msg: ' Post deleted' })
  } catch (error) {
    console.error(err.message)
    res.status(500).json('Server error')
  }
})

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already Liked' })
    }

    post.likes.unshift({ user: req.user.id })
    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error')
  }
})
// @route    PUT api/posts/unlike/:id
// @desc     unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked yet' })
    }
    const removeIdx = post.likes
      .map((item) => item.user.toString())
      .indexOf(req.user.id)
    post.likes.splice(removeIdx, 1)
    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error')
  }
})

// @route    POST api/posts/comment/:id
// @desc     Comment to a post
// @access   Private
router.post(
  '/comment/:id',
  [auth, check('text', 'Text is require').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() })
    }
    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      }
      post.comments.unshift(newComment)

      await post.save()
      res.json(post.comments)
    } catch (err) {
      console.error(err.message)
      res.status(500).json('Server error')
    }
  }
)

// @route    PUT api/posts/comment/:id/:comment_id
// @desc     delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // pull out the comment from the post
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    )

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' })
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    const removeIdx = post.comments
      .map((item) => item.user.toString())
      .indexOf(req.user.id)
      
    post.comments.splice(removeIdx, 1)
    await post.save()
    res.json(post.comments)

  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server error')
  }
})

module.exports = router
