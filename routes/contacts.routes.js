const { getContactsSideBar, getChats } = require('../controllers/contacts.controller')
const protectedRoutes = require('../middlewares/protectedRoutes')

const router = require('express').Router()

router.get('/',protectedRoutes,getContactsSideBar)
router.get('/chats',protectedRoutes,getChats)


module.exports = router