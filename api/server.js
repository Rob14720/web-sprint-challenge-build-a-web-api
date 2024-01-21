const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js');
const cors = require('cors');

server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json(`<h2>Hello from the API!</h2>`);
})
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
