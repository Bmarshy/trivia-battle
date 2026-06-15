const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/questions', async (req, res) => {
    try{
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
        const data = await response.json()
        res.json(data.results)
    }
    catch(error){
        res.status(500).json({error: 'Something went wrong'})
        console.log(error)
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log('Server is alive');


