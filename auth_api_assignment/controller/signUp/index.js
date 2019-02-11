const router = require('express').Router()
const bcrypt = require('bcryptjs')

const { validateFields } = require('../../utils/validate')

const { createUser, findUserByEmail } = require('../db')

router.post('/', validateFields, (req, res) => {
	let { username, password } = req.body

	password = bcrypt.hashSync(password)

	createUser([ username, password ])
		.then(() => {
			return res.json({
				message: 'user created successfully.'
			})
		})
		.catch(err => {
			return res.status(500).json({
				message: 'error in creating user',
				data: err
			})
		})
})

module.exports = router