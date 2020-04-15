const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar'])
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user !' })
    }

    res.json(profile)
  } catch (error) {
    console.error(error.massage)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
    }

    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body

    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (githubusername) profileFields.githubusername = githubusername
    if (status) profileFields.status = status
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim())
    }

    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (instagram) profileFields.social.instagram = instagram
    if (linkedin) profileFields.social.linkedin = linkedin
    if (facebook) profileFields.social.facebook = facebook

    try {
      let profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        // Updated
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }
      // create new one
      profile = new Profile(profileFields)

      await profile.save()
      res.json(profile)

    } catch (error) {
      console.log(error.massage)
      res.send(500).json('Server error')
    }
  }
)

module.exports = router
