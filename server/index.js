const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io =new Server(server, {cors: { origin: 'http://localhost:5173'}})

const PORT = 3001;

app.get('/api/questions', async (req, res) => {
    try{
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
        const data = await response.json()
        res.json(data.results)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: 'Something went wrong'})
        
    }
});

io.on('connection', (socket) => {
        console.log('A user connected:', socket.id)

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id)
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log('Server is alive');


