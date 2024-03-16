const router = require('express').Router()
let {sendMessage} = require('../controllers/message.controller')
const protectedRoutes = require('../middlewares/protectedRoutes')

router.post('/send/:id',protectedRoutes,sendMessage)


module.exports = router