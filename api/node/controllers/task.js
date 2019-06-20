const TaskModel = require('../models/task');
const states = require('../states');
const helper = require('../helper');

exports.list = function(req, res) {
    TaskModel.find( (err, r ) => {
        if (err) {
            return res.status(500).json();
         }
        return res.json(r);
    })
}

exports.find = function(req, res) {
    TaskModel.findById( req.params.id, (err, r ) => {
        if (err) {
            return res.status(500).json();
         }
        return res.json(r);
    })
}

exports.findByState = function(req,res) {
    TaskModel.find( {state: req.params.state }, (err, r ) => {
        if (err) {
            return res.status(500).json();
         }
        return res.json(r);
    })
}

exports.add = function(req, res) {
    const {task, description, priority} = req.body;
    const newTask = new TaskModel( {
        task,
        description,
        priority,
        state: states.TODO
    } );
    newTask.save((err, r) => {
        if (err) { return res.status(500).json(); }
        return res.status(201).json(r);
    })
}

exports.delete = function(req, res) {
    TaskModel.findByIdAndDelete(req.params.id, (err, r) => {
        if (err) { return res.status(500).json(); }
        return res.status(204).json();
    });
}

exports.edit = function(req, res) {
    const update = helper.takeIfExists(['task', 'description', 'priority', 'state'], req.body);
    TaskModel.findOneAndUpdate({ _id : req.params.id }, update, { new: true },(err, r) => {
        if (err) { return res.status(500).json(); }
        return res.json(r);
    });
}