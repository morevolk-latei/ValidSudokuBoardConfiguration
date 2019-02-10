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


const validateRequestMiddleWare = require('./auth')
const loginController = require('./controller/login')
const storeDataController = require('./controller/storeData')
const signUpController = require('./controller/signUp')

app.use('/login', loginController)
app.use('/signUp', signUpController)
app.use('/storeData', validateRequestMiddleWare, storeDataController)

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome, To Basic Auth Door using JWT.'
	})
})

app.listen(PORT, () => console.log(`Server listening on port => ${PORT}`))