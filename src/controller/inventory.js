import dbClient from '../utils/dbClient.js'


export const inventoryList = async (req, res) => {

    try {
        const list = await dbClient.inventory.findMany()
        return res.status(200).json({ data: list})
    } catch (e) {
        return res.status(500).json('unable to get members')
    }
}

export const addItem = async (req, res) => {
    const { description, quantity, sponsored, price, location } = req.body
    const adminId = req.adminId
    console.log( description, quantity, sponsored, price, location)
    try {
        const createdItem = await dbClient.inventory.create({
            data: {
                description: description,
                quantity: parseInt(quantity),
                sponsored: sponsored,
                price: parseInt(price),
                location: location,
                admin: {
                    connect: {
                        id: adminId
                    }
                }
            }
        })
        
        return res.status(201).json(createdItem)
    } catch (e) {
// res.status(500).json('unable to create item')
        return console.log(e)
    }
}

export const editItem = async (req, res) => {
    
}

export const deleteItem = async (req, res) => {
    console.log(req.params.itemId)
    const itemId = parseInt(req.params.itemId)
     
    try{
        const deletedItem = await dbClient.inventory.delete({
            where:{
                id: itemId
            }
        })
        return res.status(201).json(deletedItem)
    }catch (e) {
        return res.status(500).json('unable to delete item')
    }



}