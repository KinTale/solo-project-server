import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRY } from '../utils/config.js'
import dbClient from '../utils/dbClient.js'

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const foundAdmin = await dbClient.admin.findUnique({
            where: {
                email: email
            }
        })
        const isValid = await validateCredentials(password, foundAdmin)
        if (!isValid) {
            return res.status(400).json({
                email: 'Invalid email and/or password provided'
            })
        }
        const token = generateJwt(foundAdmin.id)
        return res.status(200).json({ token, foundAdmin })
    } catch (e) {
        return res.status(500).json({ status: 'error' })
    }
}

async function validateCredentials(password, admin) {
    if ((!password) || (!admin)) {
        return false
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


