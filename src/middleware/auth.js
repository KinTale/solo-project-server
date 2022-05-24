import { JWT_SECRET } from "../utils/config";
import jwt from 'jsonwebtoken'
import dbClient from "../utils/dbClient";

export async function validateAuth(req, res, next) {
    const header = req.header('authorization')
    if (!header) {
        return res.status(401).json({ authentication: 'Missing Authorization header' })
    }
    const [type, token] = header.split(' ')

    const isTypeValid = validateTokenType(type)
    if (!isTypeValid) {
        return res.status(401).json({ authentication: 'invalid token type' })
    }

    const isTokenValid = validateToken(token)
    if (!isTokenValid) {
        return res.status(401).json({ authentication: 'Invalid or missing token' })
    }

    const decodedToken = jwt.decode(token)
    const foundAdmin = await dbClient.admin.findUnique({
        where: {
            id: decodedToken.id
        }
    })
    delete foundAdmin.password
    next()

}

function validateToken(token) {
    if (!token) {
        return false
    }

    return jwt.verify(token, JWT_SECRET, (error) => {
        return !error
    })
}

function validateTokenType(type) {
    if (!type) {
        return false
    }

    if (type.toUpperCase() !== 'BEARER') {
        return false
    }

    return true
}