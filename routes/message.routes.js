const router = require('express').Router()
let {sendMessage, getChatMessages,createChat} = require('../controllers/message.controller')
const protectedRoutes = require('../middlewares/protectedRoutes')

router.post('/send',protectedRoutes,sendMessage) //send message //chat
router.post('/new',protectedRoutes,createChat) // new chat private or group
router.get('/:id',protectedRoutes,getChatMessages) //old chats search by chatID

module.exports = router