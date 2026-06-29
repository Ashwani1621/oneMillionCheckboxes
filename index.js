import express from 'express'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import 'dotenv/config'
import { Server } from 'socket.io'
const app = express()
const server = createServer(app)
const PORT = process.env.PORT ?? 3001
const CHECKBOX_COUNT = 10

// IN MEMORY STATE
const state = {
    checkboxes : new Array(CHECKBOX_COUNT).fill(false)   
}

const io = new Server(server, {connectionStateRecovery: {}})
io.on('connection', (socket)=>{
    socket.on('client:checkbox:change', (data)=>{  
        console.log(data) 
        state.checkboxes[data.index] = data.checked
        socket.broadcast.emit('change-ui', data)
    })
})

app.use(express.static(resolve('./public')))
app.get('/health', (req, res)=>{
    res.json({message: "Server is healthy"})
})
app.get('/checkboxes', (req, res)=> {
    res.json({checkboxes: state.checkboxes})
})

server.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})