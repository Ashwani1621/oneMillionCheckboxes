import express from 'express'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import 'dotenv/config'

const app = express()
const server = createServer(app)
const PORT = process.env.PORT ?? 3001


app.use(express.static(resolve('./public')))
app.get('/health', (req, res)=>{
    res.json({message: "Server is healthy"})
})

server.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})