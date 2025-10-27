const express = require('express')
const app = express()
const router = require('./routes/ai.routes')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
}))

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/ai', router)


module.exports = app