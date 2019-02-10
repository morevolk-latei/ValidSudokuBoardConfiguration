const router = require('express').Router()

router.post('/', (req, res) => {
	console.log('in login /')
	const { body } = req
	const { username, password } = body

	console.log('login -> ', { username, password })
	res.json({
		message: 'Login Successfull',
		data: { username, password }
	})
})

router.post('*', (req, res) => {
	res.status(400).json({
		message: 'Invalid POST to login'
	})
})

module.exports = router