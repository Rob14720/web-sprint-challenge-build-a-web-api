// add middlewares here related to projects


const Projects = require('./projects-model');

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
    .then(project => {
        if (project) {
            req.project = project;
            next();
        } else {
            next({ status: 404, message: 'Project not found' });
        }
    })

    .catch(next);
}

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400).json({ message: 'Missing required fields' });
    } else {
        next();
    }
}


 module.exports = {
    validateProjectId,
    validateProject,
}