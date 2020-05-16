const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Posts')
const axios = require('axios')
const config = require('config')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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

// @route    GET api/profile
// @desc     Get all users profiles
// @access   puplic

router.get('/', async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (err) {
    console.log(err.massage)
    res.status(500).json('Server Error !')
  }
})

// @route    GET api/profile/user/:user_id
// @desc     Get user profile
// @access   puplic
router.get('/user/:user_id', async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar'])
    if (!profile) return res.status(400).json({ msg: 'Profile not found' })

    res.json(profile)
  } catch (err) {
    console.log(err.massage)
    res.status(500).json('Server Error !')
  }
})

// @route    DELETE api/profile
// @desc     Delete user & profile
// @access   private

router.delete('/', auth, async (req, res) => {
  try {
    // delete user posts
    await Post.deleteMany({user : req.user.id})
    
    await Profile.findOneAndRemove({ user: req.user.id })
    
    await User.findOneAndRemove({ _id: req.user.id })
    

    res.json({ msg: ' User deleted ' })
  } catch (err) {
    console.error(err.massage)
    res.status(500).json('Server Error !')
  }
})

// @route    PUT api/profile/experience
// @desc     Set user experience
// @access   private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
    }

    const {
      title,
      company,
      from,
      to,
      location,
      description,
      current,
    } = req.body

    const newExp = {
      title,
      company,
      from,
      to,
      location,
      description,
      current,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.experience.unshift(newExp)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.massage)
      res.status(500).json('Server Error !')
    }
  }
)

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete user experience
// @access   private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex, 1)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.massage)
    res.status(500).json('Server Error !')
  }
})

// @route    PUT api/profile/education
// @desc     Set user education
// @access   private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
    ],
  ],
  async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.education.unshift(newEdu)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.massage)
      res.status(500).json('Server Error !')
    }
  }
)

// @route    DELETE api/profile/experience/:edu_id
// @desc     Delete user education
// @access   private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {

    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      edu => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (err) {
    console.error(err.massage)
    res.status(500).json('Server Error !')
  }
})

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
    
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});



module.exports = router
