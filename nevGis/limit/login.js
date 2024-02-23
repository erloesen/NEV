// import joi
const joi = require('joi');

const account = joi.string().alphanum().min(6).max(20).required();
// only accept num and A-Za-z
const password = joi.string().pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{6,20}$/).required();
const phone= joi.string().alphanum().max(11);
const email = joi.string().pattern(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).max(50);
// const job = joi.string().max(100).allow('', null);
const job = joi.string().max(100);
const company = joi.string().max(100);

exports.login_limit = {
    body: {
        account,
        password,
        phone,
        email,
        job,
        company
    }
}
