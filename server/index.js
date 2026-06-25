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

const rooms = {}
function generateRoomCode(){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let roomCode = ""
    for(let i=0; i<4; i++){
        roomCode += alphabet[Math.floor(Math.random()* alphabet.length)]
    }
    return roomCode
}

io.on('connection', (socket) => {
        console.log('A user connected:', socket.id)

        socket.on('create-room', (data) => {
            let roomCode = generateRoomCode()
            rooms[roomCode] = {players: [{ id: socket.id, name: data.playerName}], host: socket.id}
            socket.join(roomCode)
            socket.emit('room-created', {roomCode})
        })

        socket.on('join-room', (data) => {
            if(!rooms[data.roomCode]){
                socket.emit('error', {message: 'Room not found'})
                return
            }
            else{
                rooms[data.roomCode].players.push({ id: socket.id, name: data.playerName})
                socket.join(data.roomCode)
                socket.emit('room-joined', { roomCode: data.roomCode, players: rooms[data.roomCode].players })
                socket.to(data.roomCode).emit('player-joined', {players: rooms[data.roomCode].players})
            }
        })

        socket.on('start-game', async ({roomCode}) => {
            try{
                const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
                const data = await response.json()
                rooms[roomCode].questions = data.results
                rooms[roomCode].questionIndex = 0
                io.to(roomCode).emit('game-started', {question: rooms[roomCode].questions[0], questionIndex: rooms[roomCode].questionIndex})
            }
            catch(error){
                console.log(error)
                io.to(roomCode).emit('error', {message: 'Failed to Fetch Questions'})
            }
        })

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id)
            const code = Object.keys(rooms)
            for(let i = 0; i < code.length; i++){
                if(rooms[code[i]].players.some(p => p.id === socket.id)){
                    rooms[code[i]].players = rooms[code[i]].players.filter(p => p.id !== socket.id)
                    if(rooms[code[i]].players.length === 0){
                        delete rooms[code[i]]
                    }
                    else io.to(code[i]).emit('player-left', {players: rooms[code[i]].players})

                }
                
            }
        })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log('Server is alive');


