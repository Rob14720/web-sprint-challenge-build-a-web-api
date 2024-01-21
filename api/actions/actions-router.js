// Write your "actions" router here!
const express = require('express');
const { validateActionId, validateAction } = require('./actions-middlware.js');
const Actions = require('./actions-model.js');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get();
        if (actions) {
            res.status(200).json(actions);
        } else {
            return [];
        }
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({
                message: 'Action not found'
            });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', validateAction, validateActionId, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body);
        if (newAction) {
            res.status(201).json(newAction);
        } else {
            res.status(400).json({
                message: 'Please provide all required fields'
            })
        }
    } catch (error) {
        next(error);
    }
})

router.put('/:id', validateAction, validateActionId, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body);
        if (updatedAction) {
            res.status(200).json(updatedAction);
        } else {
            res.status(400).json({
                message: 'Action not found'
            }) 
        }  
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedAction = await Actions.remove(req.params.id);
        if (deletedAction) {
            res.status(200).json(deletedAction);
        } else {
            res.status(404).json({
                message: 'Action not found'
            })
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;