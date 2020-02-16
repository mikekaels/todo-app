const Task = require('../models/task.js');
const {
    success,
    error,
} = require('../helpers/response.js');

const translator = require('../helpers/translate').translator

exports.createTask = async (req, res) => {
    try {
        let result = await Task.newTask(req.body, req.user._id)
        success(res, result, 201, await translator('taskCreated', req))
    }
    catch (err) {
        error(res, err, 422)
    }
}

exports.viewTask = async (req, res) => {
    let result = await Task.findTask(req.user._id, req.params.page)
    success(res, result, 200)
}

exports.viewAllTask = async (req, res) => {
    let result = await Task.findAllTask(req.user._id)
    success(res, result, 200)
}

exports.sortTaskAsc = async (req, res) => {
    try {
        let result = await Task.sortTaskByParamsAsc(req.user._id, req.params.sort, req.params.page)
        success(res, result, 200)
    }
    catch (err) {
        error(res, err, 422)
    }
}

exports.sortTaskDesc = async (req, res) => {
    try {
        let result = await Task.sortTaskByParamsDesc(req.user._id, req.params.sort, req.params.page)
        success(res, result, 200)
    }
    catch (err) {
        error(res, err, 422)
    }
}

exports.filterTaskImportance = async (req, res) => {
    try{
        let result = await Task.filterTaskByImportance(req.user._id, req.params.value, req.params.page)
        success(res, result, 200)
    }
    catch (err) {
        error(res, err, 422)
    }
}

exports.filterTaskCompletion = async (req, res) => {
    try{
        let result = await Task.filterTaskByCompletion(req.user._id, req.params.value, req.params.page)
        success(res, result, 200)
    }
    catch (err) {
        error(res, err, 422)
    }
}

exports.editTask = async (req, res) => {
    try {
        let result = await Task.updateTask(req.user._id, req.params.id, req.body)
        success(res, result, 201, await translator('taskEdited',req))
    }
    catch (err) {
        error(res, err, 422)
    }
}

exports.deleteTask = async (req, res) => {
    try {
        let result = await Task.destroyTask(req.params.id)
        success(res, result, 200)
    }
    catch (err) {
        error(res, err, 422)
    }
}