const router = require('express').Router()
const bcrypt = require('bcryptjs')

const { findUserByEmail, resetPassword } = require('../db')
const { validateResetFields } = require('../../utils/validate')

router.post('/', validateResetFields, (req, res) => {
	const { username, currentPassword, newPassword } = req.body
	// now that we are here means all fields are present with values
	// token is also present means now can reset password

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

		const isPasswordSame  =  bcrypt.compareSync(currentPassword, user.password)
		
		if(!isPasswordSame) {
			return res.status(401).json({
				message: 'Password not valid!'
			})
		}

		// now that user is validate and credentials is also correct
		// updating the password with new password
		const hashPass = bcrypt.hashSync(newPassword)

		resetPassword(username, hashPass)
			.then(user => {
				console.log('user ', user)
				return res.json({
					message: 'Password reset successfully.'
				})
			})
			.catch(err => {
				console.log('Some error occured. could not reset password')
				return res.status(500).json({
					message: 'Some error occured. could not reset password',
					data: err
				})
			})
	})
})

module.exports = router