const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('Profile Router'))

module.exports = router
