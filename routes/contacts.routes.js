const { getContactsSideBar } = require('../controllers/contacts.controller')
const protectedRoutes = require('../middlewares/protectedRoutes')

const router = require('express').Router()

router.get('/',protectedRoutes,getContactsSideBar)

module.exports = router