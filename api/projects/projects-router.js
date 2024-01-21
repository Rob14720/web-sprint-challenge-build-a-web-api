const express = require('express');
const { validateProjectId, validateProject } = require('./projects-middleware.js');
const Projects = require('./projects-model.js');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', validateProject, validateProjectId,  async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
       if (newProject) {
           res.status(201).json(newProject);
       } else {
           res.status(400).json({ message: 'Please provide all required fields' });
       }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', validateProject, validateProjectId, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        if (updatedProject) {
            res.status(400).json(updatedProject);
        } else {
            res.status(400).json({ message: 'Missing required fields' });
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedProject = await Projects.remove(req.params.id);
        if (deletedProject) {
            res.status(200).json(deletedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        next(error);
    }
});

router.get('/:id/actions', async (req, res, next) => {
    try {
        const projectActions = await Projects.getProjectActions(req.params.id);
        if (projectActions) {
            res.status(200).json(projectActions);
        } else {
            return [];
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
