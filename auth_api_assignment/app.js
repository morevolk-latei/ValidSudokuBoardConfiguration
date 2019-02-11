const express = require('express')

global.env 		= process.env.NODE_ENV || 'dev'
global.config 	= require('./config/config.json')[global.env]
const PORT 		= global.config['default_port']

const app 		= express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (global.env === 'dev') {
	app.use(require('morgan')('dev'))
}

// using sqlite3 a file based DB
try {
	const  sqlite3  =  require('sqlite3').verbose()
	global.db = new sqlite3.Database("./users.db")
	console.log('DB connection successfull')
	console.log(require('./controller/db').createUsersTable())
} catch(error) {
	console.log('Some error ooccured in DB connection ->')
	console.log(error)
}


const validateRequestMiddleWare = require('./auth')
const loginController = require('./controller/login')
const storeDataController = require('./controller/storeData')
const signUpController = require('./controller/signUp')
const resetPassController = require('./controller/reset')

app.use('/login', loginController)
app.use('/signUp', signUpController)
app.use('/storeData', validateRequestMiddleWare, storeDataController)
app.use('/resetPassword', validateRequestMiddleWare, resetPassController)

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome, To Basic Auth Door using JWT.'
	})
})

app.listen(PORT, () => console.log(`Server listening on port => ${PORT}`))