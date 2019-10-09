const Project = require('./project.model.js');

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Project content cannot be empty!"
        });
    }

    const project = new User({
        projectTitle: req.body.projectTitle, 
        projectStartDate: req.body.projectStartDate,
        projectEndDate: req.body.projectEndDate,
        tasks: req.body.tasks,
    });

    project.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating the project!"
        });
    });
};

exports.findAll = (req, res) => {
    Project.find()
    .then(projects => {
        res.send(projects);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while retrieving projects!"
        });
    });
};

exports.findOne = (req, res) => {
    Project.findById(req.params.projectId)
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.projectId
            });            
        }
        res.send(project);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.projectId
            });                
        }
        return res.status(500).send({
            message: "Something went wrong retrieving project with id " + req.params.projectId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Project content cannot be empty!"
        });
    }

    User.findByIdAndUpdate(req.params.userId, {
        projectTitle: req.body.projectTitle, 
        projectStartDate: req.body.projectStartDate,
        projectEndDate: req.body.projectEndDate,
        tasks: req.body.tasks,
    }, {new: true})
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.projectId
            });
        }
        res.send(project);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.projectId
            });                
        }
        return res.status(500).send({
            message: "Something went wrong updating note with id " + req.params.projectId
        });
    });
};

exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.projectId)
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.projectId
            });
        }
        res.send({message: "Project deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.projectId
            });                
        }
        return res.status(500).send({
            message: "Could not delete project with id " + req.params.projectId
        });
    });
};