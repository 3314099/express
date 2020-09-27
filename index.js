const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', (req,res)=>{
	res.send('Hello Express')
})

app.listen(port,()=>{
	console.log(`webapp listening on port ${port}`)
})
