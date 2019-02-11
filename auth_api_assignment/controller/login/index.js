const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { validateFields, generateAccessToken } = require('../../utils/validate')

const { findUserByEmail } = require('../db')
// this validation function is generic validator of fields
// will return array of errors found

router.post('/', validateFields, (req, res) => {
	// we are here means all validations are done
	// now create the JWT and send it to the user
	const { username, password } = req.body

	findUserByEmail(username, (err, user) => {
		if (err) {
			return res.status(500).json({
				message: 'Server error, Please try again after some time.',
				data: err
			})
		}

		if (!user) {
			return res.status(404).json({
				message: 'user not found'
			})
		}

		const isPasswordSame  =  bcrypt.compareSync(password, user.password)
		
		if(!isPasswordSame) {
			return res.status(401).json({
				message: 'Password not valid!'
			})
		}

		generateAccessToken({
			username,
			key: bcrypt.hashSync(`${+Math.tan(Math.random() % 10 + 1) + 2}`)
		})
			.then(access_token => {
				return res.json({
					message: 'Login in Successfully',
					data: { username },
					access_token
				})
			})
			.catch(err => {
				console.log('Error in token generation ', err)
				return res.status(500).json({
					message: 'Could not login.',
					data: err
				})
			})
	})

})


router.post('*', (req, res) => {
	res.status(400).json({
		message: 'Invalid POST to login'
	})
})

module.exports = router