const db = require('../db/index.js');
const bcrypt = require('bcrypt');
// generate uuid
const crypto = require('crypto');
// file
fs = require('fs');


exports.uploadAvatar = (req, res) => {
    const onlyid = crypto.randomUUID();
    let oldName = req.files[0].filename;
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf-8');
    fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName);

    const sql = 'insert into sys_avt_images (imageurl, onlyid) values ($1, $2)'
    const values = [`http://localhost:3000/upload/${newName}`, onlyid]
    db.query(sql, values, (err, result) => {
        if (err) { return res.cc(err) }
        res.send({
            onlyid,
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
        result.rows[0].password = ''
        res.send(result.rows[0])
    })
}

// modify password read old one then set new one
exports.changePassword = (req, res) => {
    const sql = 'select password from sys_users where id = $1'
    db.query(sql, [req.body.id], (err, result) => {
        if (err) {return res.cc(err)}
        const compareResult = bcrypt.compareSync(req.body.oldpassword, result.rows[0].password)
        if (!compareResult) {return res.cc('password incorrect!')}
        req.body.newpassword = bcrypt.hashSync(req.body.newpassword, 10)
        const sql1 = 'update sys_users set password = $1 where id = $2'
        db.query(sql1, [req.body.newpassword, req.body.id], (err, result) => {
            if (err) {return res.cc(err)}
            res.cc('modified', 0)
        })
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

// forgetPassword verify account and email
exports.verifyAccountAndEmail = (req, res) => {
    const {account, email} = req.body;
    const sql = 'select * from sys_users where account = $1'
    db.query(sql, [account], (err, result) => {
        if (err) { return res.cc(err) }
        if (email == result.rows[0].email) {
            return res.send({
                status: 0,
                message: 'verify successfully',
                id: result.rows[0].id
            })
        } else {
            return res.cc('verify failed!')
        }
    })
}

// forgetPassword reset it use id and newpassword
exports.resetPassword = (req, res) => {
    req.body.newpassword = bcrypt.hashSync(req.body.newpassword, 10)
    const sql = 'update sys_users set password = $1 where id = $2'
    db.query(sql, [req.body.newpassword, req.body.id], (err, result) => {
        if (err) { return res.cc(err) }
        res.cc('updated', 0)
    })
}
