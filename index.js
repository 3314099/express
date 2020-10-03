const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const createError = require('http-errors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = 3000
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sar7r.mongodb.net/webapp?retryWrites=true&w=majority`

mongoose.connect(url, {
	useNewUrlParser:true,
	useUnifiedTopology: true
}, ()=> {
	console.log('DB connected...')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use('/', indexRouter)
app.use(userRouter)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// view engine setup
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

// catch 404 and forvard to error handler
app.use((req, res, next) => {
	next(new createError)
})

// error handler
app.use((err, req, res, next) => {
	//render error page
	console.error(err.stack)
	res.status(err.status)
	res.render('error.html', {err})
})

app.listen(port,()=>{
	console.log(`webapp listening on port ${port}`)
})
