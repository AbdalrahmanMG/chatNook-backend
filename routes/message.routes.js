const router = require('express').Router()
let {sendMessage, getMessage} = require('../controllers/message.controller')
const protectedRoutes = require('../middlewares/protectedRoutes')

router.post('/send',protectedRoutes,sendMessage)
router.get('/get',protectedRoutes,getMessage)


module.exports = router