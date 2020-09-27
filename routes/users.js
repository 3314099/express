const express = require('express')
const router = express.Router()
const userModel = require('../models/User')

router.get('/users', (req, res)=> {
	res.render('users.html', {message: ''})
})

// POST
router.post('/users', async (req, res)=> {
	const user = new userModel({
		firstname: req.body.firstname,
		lastname: req.body.lastname
	})

	try {
		const newUser = await user.save()
		res.render('users.html', { message: newUser})
	} catch (err) {
		res.render('user.html', { message: err})
	}
})

module.exports = router
