const router = require('express').Router()
const {login, logout ,signup} = require('../controllers/user.controller.js')

router.post('/signup', signup )

router.post('/login', login)

router.post('/logout', logout)



module.exports = router