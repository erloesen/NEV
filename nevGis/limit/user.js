const joi = require('joi');

const id = joi.required();
const name = joi.string().pattern(/^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/).required();
const email = joi.string().pattern(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).required();
const oldpassword = joi.string().pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{6,20}$/).required();
const newpassword = joi.string().pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{6,20}$/).required();

exports.password_limit = {
    body: {
        id,
        oldpassword,
        newpassword
    }
}

exports.name_limit = {
    body: {
        id,
        name
    }
}

exports.email_limit = {
    body: {
        id,
        email
    }
}

exports.reset_password_limit = {
    body: {
        id,
        newpassword
    }
}