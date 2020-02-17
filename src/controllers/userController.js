const User = require('../models/user')
const {
    success,
    error,
} = require('../helpers/response')


const translator = require('../helpers/translate').translator

exports.create = async (req, res) => {
    try {
        let result = await User.register(req.body)
        success(res, result, 201, await translator('userCreated', req))
    }
    catch (err) {
        error(res, err, 422)
    }
}

exports.login = async (req, res) => {
    try {
        let result = await User.login(req.body)
        success(res, result, 200, await translator('loggedIn'), req)
    }
    catch (err) {
        error(res, err, 422)
    }
}

exports.updateData = async (req, res) => {
    try {
        let result = await User.updateData(req.user._id, req)
        success(res, result, 201, await translator('userUpdated'), req)
    }
    catch (err) {
        error(res, err, 422)
    }
}
