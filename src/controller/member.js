import dbClient from '../utils/dbClient.js'

export const addMember = async (req, res) => {
    const { name , title} = req.body
    console.log('server add member', name, title)

}