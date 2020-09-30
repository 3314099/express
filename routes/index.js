const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
	res.render('index.html', {message: 'Hello Express!!!', appname: 'WebbApp'})
})

router.get('/about', (req, res)=> {
	res.render('about.html', {message: 'Hello Express!!!', appname: 'WebbApp'})
})

module.exports = router
