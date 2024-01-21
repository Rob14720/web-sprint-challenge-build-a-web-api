

const Actions = require('./actions-model')

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
    .then(action => {
        if (action) {
            req.action = action;
            next();
        } else {
            next({ status: 404, message: 'Action not found' });
        }
    })

    .catch(next);
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: 'Missing required fields' });
    } else {
        next();
    }
}

module.exports = {
    validateActionId,
    validateAction,
}


