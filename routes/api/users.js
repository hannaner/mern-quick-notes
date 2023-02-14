const express = require('express')
const router = express.Router()

const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// localhost:3000/api/user
// hitting the server
// app.use('api/users', userRoutes)
router.post('/', usersCtrl.create)

// login route
router.post('/login', usersCtrl.login )

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

module.exports = router