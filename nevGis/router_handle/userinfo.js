const db = require('../db/index.js');
const bcrypt = require('bcrypt');
// generate uuid
const crypto = require('crypto');
// file
fs = require('fs');


exports.uploadAvatar = (req, res) => {
    const onlyId = crypto.randomUUID();
    let oldName = req.files[0].filename;
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf-8');
    fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName);

    const sql = 'insert into sys_avt_images (imageurl, onlyid) values ($1, $2)'
    const values = [`http://localhost:3000/upload/${newName}`, onlyId]
    db.query(sql, values, (err, result) => {
        if (err) { return res.cc(err) }
        res.send({
            onlyId,
            status:0,
            url:'http://localhost:3000/upload/' + newName
        })

    })
}

// bind account and imageurl
exports.bindAccount = (req, res) => {
    const {account, url, onlyid} = req.body;
    const sql1 = 'update sys_avt_images set account = $1 where onlyid = $2';
    const value1 = [account, onlyid];
    db.query(sql1, value1, (err, result) => {
        if (err) { return res.cc(err) }
        if (result.rowCount == 1) {
            const sql2 = 'update sys_users set imageurl = $1 where account = $2';
            const value2 = [url, account];
            db.query(sql2, value2, (err, result) => {
                if (err) { return res.cc(err) }
                res.cc('modified', 0)
            })
        }
    })
}

// get user info
exports.getUserinfo = (req, res) => {
    const sql = 'select * from sys_users where id = $1';
    db.query(sql, [req.body.id], (err, result) => {
        if (err) { return res.cc(err) }
        res.send(result)
    })
}

// modify name use id
exports.changeName = (req, res) => {
    const {id, name} = req.body;
    const sql = 'update sys_users set name = $1 where id = $2';
    db.query(sql, [name, id], (err, result) => {
        if (err) { return res.cc(err) }
        res.cc('modified', 0)
    })
}

// modify sex use id
exports.changeSex = (req, res) => {
    const {id, sex} = req.body;
    const sql = 'update sys_users set sex = $1 where id = $2';
    db.query(sql, [sex, id], (err, result) => {
        if (err) { return res.cc(err) }
        res.cc('modified', 0)
    })
}

// modify email use id
exports.changeEmail = (req, res) => {
    const {id, email} = req.body;
    const sql = 'update sys_users set email = $1 where id = $2';
    db.query(sql, [email, id], (err, result) => {
        if (err) { return res.cc(err) }
        res.cc('modified', 0)
    })
}
