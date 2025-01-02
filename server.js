const express = require('express');
const path = require('path'); //handles file calling and retrieving

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public'))); //retrieves all necessary files from public

//API: The "menu" of the backend kitchen. Brings the necessary files that the website asks for and derives it from the public source folder
    //Responsible for reactivity/responsiveness of a web application
    //Usually active as HTTP ports, so that the kitchen knows from which client they have to get orders from and serve obejcts to. 
    
    app.use('/public', express.static(path.join(__dirname, 'public')));

    const cors = require('cors');
    app.use(cors({
        origin: 'http://127.0.0.1:5174' // Specify the client's origin
    }));

    app.get('/', (req,res)=>{
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    //GET: Get the data from the data kitchen and serve it up
    app.get('/api/data', (req, res) => { //req from client, res to display --> '/api/data' is the fetch codename
        res.json({ message: 'Hello from the backend!' }); // Respond with JSON data.
    });

    app.get('/api/model', (req,res) => {
        res.sendFile(path.join(__dirname, 'public/models/GalaxyS10.gltf'));
    });

    //POST: Get certain user input and save it as a dish/ingredient in the data kitchen
    app.post('/api/save-scene', express.json(), (req, res) => { 
        const sceneData = req.body; // Get the scene data from the request
        console.log('Scene data saved:', sceneData);
        res.status(200).json({ message: 'Scene data saved successfully!' });
    });
    

    app.listen(PORT, () => {
        console.log(`Server running at http://127.0.0.1:${PORT}`);
    });

    
    