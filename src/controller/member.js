import dbClient from '../utils/dbClient.js'

export const addMember = async (req, res) => {
    const { name, title } = req.body
    const adminId = req.adminId
    try {
        const createdMember = await dbClient.member.create({
            data: {
                name: name,
                title: title,
                admin: {
                    connect: {
                        id: adminId
                    }
                }
            }
        })
        return res.status(201).json(createdMember)
    } catch (e) {

        return res.status(500).json('unable to create member')
    }
}

export const allMembers = async (req, res) => {

    try {
        const memberList = await dbClient.member.findMany()
        return res.status(200).json({ data: memberList })
    } catch (e) {
        console.log('ERROR', e)
        return res.status(500).json('unable to get members')
    }
}

export const deleteMember = async (req, res) => {
    const adminId = parseInt(req.params.adminId)
    try {
        const deletedMember = await dbClient.member.delete({
            where: {
                id: adminId
            }
        })
        return res.status(200).json({ data: deletedMember })
    } catch (e) {
        return res.status(500).json('Record to delete does not exist.')
    }
}