import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import memberRouter from './routes/member.js'
import inventoryRouter from './routes/inventory.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/' , authRouter)
app.use('/members', memberRouter)
app.use('/inventory', inventoryRouter)
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`\n Server is running on port ${port}\n`)
})