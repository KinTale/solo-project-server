import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRY } from '../utils/config.js'
import dbClient from '../utils/dbClient.js'

export const login = async (req, res) => {
    const { email, password } = req.body
    console.log('from body', email, password)
    try {
        const foundAdmin = await dbClient.admin.findUnique({
            where: {
                email: email
            }
        })
        console.log('found', foundAdmin)
        const isValid = await validateCredentials(password, foundAdmin)
        console.log('admin', isValid)
        if (!isValid) {
            return console.log('WRONG')
        }
        const token = generateJwt(foundAdmin.id)
        console.log(token)
        return res.status(200).json({ token, foundAdmin })
    } catch (e) {
        return  res.status(500).json({ status: 'error' })
    }
}

async function validateCredentials(password, admin) {
     console.log('compare function', password, admin)
    if ((!password) || (!admin)) {
        return console.log('validate credinatials false')
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password)
   
    if (!isPasswordValid) {
        return false
    }
    return true
}


function generateJwt(adminId) {
    return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}


