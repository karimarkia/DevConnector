const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

router.post(
  '/',
  [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
    }

    const { name, email, password } = req.body
    try {
      // Check if user exist
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ error: [{ msg: 'User is Exists' }] })
      }
      //   get user avatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })

      user = new User({
        name,
        password,
        email,
        avatar,
      })

      //   hash the password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      //   return JWT
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({token})
        }
      )


    } catch (err) {
      console.error(err.massage)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
