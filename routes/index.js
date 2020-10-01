// import {Home} from "../src/classes/Home"

const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
	res.render('index.html',
		{
			message: 'Hello Express!!!',
			appname: 'WebbApp',
			title: 'Index'
		})
})

// router.get('/page', (req, res)=> {
// 	const page = new Home('Index')
// 	res.send(page.toHtml())
// })

router.get('/about', (req, res)=> {
	res.render('about.html', {
		title: 'About',
		message: 'Hello Express!!!',
		appname: 'WebbApp'})
})

module.exports = router
