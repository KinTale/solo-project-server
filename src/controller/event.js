import dbClient from "../utils/dbClient.js";

export const getEvent =  async (req, res) => {
    try {
        const getEvents = await dbClient.event.findMany()
        return res.status(200).json({data: getEvents})
    } catch (e) {
        return console.log(e)
    }
}

export const createEvent = async (req, res) => {
    const {description, date, time, location} = req.body

    console.log('create event',description, date, time, location )

}