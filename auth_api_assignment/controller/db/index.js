const  createUsersTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        username text UNIQUE,
        password text)`

    return  global.db.run(sqlQuery)
}

const  findUserByEmail  = (email, cb) => {
    return  global.db.get(`SELECT * FROM users WHERE username = ?`,[email], (err, row) => {
            cb(err, row)
    })
}

const resetPassword = (email, newPassword) =>
    new Promise(( resolve, reject ) => {
        global.db.run(`UPDATE users SET password = ? WHERE username = ?`, [newPassword, email], (err, row) => {
            if (err) {
                return reject(err)
            }

            resolve(row)
        })
    })

const  createUser  = (user, cb) => 
    new Promise(( resolve, reject ) => {
        global.db.run('INSERT INTO users (username, password) VALUES (?,?)',user, (err) => {
            if (err) {
                return reject(err)
            }

            resolve()
        })
    })

module.exports = {
    createUsersTable,
    findUserByEmail,
    resetPassword,
    createUser
}