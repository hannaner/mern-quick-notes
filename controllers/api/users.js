const User = require('../../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function createJWT(user){
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}

async function create(req, res){
/* how is this connected?
    we're getting this info from router.post in routes/api/users.js
    res.json({
        user: {
            name: req.body.name,
            email: req.body.email
        }
    })
*/
    try {
        const user = await User.create(req.body)
        // making a token variable so that we can save the response
        const token = createJWT(user)
        
        // send token that you just created
        // must send response!
        res.json(token)
    } catch(error) {
        res.status(400).json(error)
    }
}

async function login(req, res){
    try {
        /* what are we trying to do?
            1. get the user that's trying to login
            2. check if the pw is valid
            3. if so, create a JWT and send it back
            4. if not, throw an error
        */ 
        const user = await User.findOne({email: req.body.email})
        if (!user) throw new Error()
        /* next we need to see if the hashed passwords match
            we import bcrypt for this
            bcrypt.compare will spit out true or false
        */
       const passwordsMatch = bcrypt.compare(req.body.password, user.password)

       if (passwordsMatch){
        res.json(createJWT(user))
       } else {
        throw new Error()
       }
    } catch {
        res.status(400).json("email/passwords don't match!")
    }
}

function checkToken(req, res){
    console.log('req.user', req.user)
    res.json(req.exp)
}

module.exports = {
    create,
    login,
    checkToken
}