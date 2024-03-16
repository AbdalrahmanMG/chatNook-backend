const router = require('express').Router()
let {sendMessage, getMessage} = require('../controllers/message.controller')
const protectedRoutes = require('../middlewares/protectedRoutes')

router.post('/send/:id',protectedRoutes,sendMessage)
router.get('/:id',protectedRoutes,getMessage)


module.exports = router