const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000
const indexRouter = require('./routes/index')

app.use('/', indexRouter)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)


app.listen(port,()=>{
	console.log(`webapp listening on port ${port}`)
})
