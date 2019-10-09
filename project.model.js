const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectTitle: String,
    projectStartDate: String,
    projectEndDate: String,
    tasks: Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('Projects', ProjectSchema);