const jwt = require('jsonwebtoken')

const SECRET_KEY = global.config['JWTSecret']

const isValidHeader = header => header.startsWith('Bearer ')

const isTokenValid = token =>
	new Promise((resolve, reject) => {
		jwt.verify(token, SECRET_KEY, (err, decodedString) => {
			if (err || !decodedString) {
				return reject(err)
			}

			resolve(decodedString)
		})
	})

const validateRequest = (req, res, next) => {
	const reqHeader = req.headers['x-access-token'] || req.headers['authorization']
	let token = null

	if (isValidHeader(reqHeader)) {
		// header is valid
		// now splicing string to get the token from it

		token = reqHeader.slice(7, reqHeader.length)
	}

	if (token) {
		// token is some jwt string
		// now, time to verify the received token

		isTokenValid(token)
			.then(decodedToken => {
				// token is valid so by passing middlware
				// by attaching decoded token to req

				req.user = decodedToken
				next()
			})
			.catch(err => {
				// token is not valid, rejecting req
				res.status(400).json({
					message: 'Auth token is not valid'
				})
			})
	} else {
		/* 	
			there is no token
			could be due to invalid header
			rejecting request
		*/
		return res.status(400).json({
			message: 'Improper Header'
		})
	}
}

module.exports = validateRequest
