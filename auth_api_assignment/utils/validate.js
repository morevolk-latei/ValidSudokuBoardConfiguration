const jwt = require('jsonwebtoken')

const validateFieldsHelper = fields => {
	const errors = []

	Object.keys(fields).forEach(field => {
		if (!fields[field] || fields[field].trim().length === 0) {
			errors.push(`${field} is required`)
		}
	})

	return errors
}

function validateFields (req, res, next) {
	const { body } = req
	const { username, password } = body

	console.log('fields -> ', { username, password })

	const errors = validateFieldsHelper({ username, password })

	if (errors.length > 0) {
		return res.status(400).json({
			message: 'Invalid Request',
			data: [...errors]
		})
	}

	// if control flow reaches here means both username and password is present
	// call next middleware

	next()
}

const generateAccessToken = (hashData) =>
	new Promise(( resolve, reject ) => {

		console.log('creatig access_token with hashData, ', hashData)
		const { JWTSecret, access_token_expire } = global.config

		jwt.sign(hashData, JWTSecret, { expiresIn: access_token_expire }, (err, token) => {
			if (err) {
				return reject(err)
			}

			resolve(token)
		})
	})

module.exports = {
	validateFields,
	generateAccessToken
}