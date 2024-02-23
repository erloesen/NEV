const db = require('../db/index.js');
const bcrypt = require('bcrypt');
// generate uuid
const crypto = require('crypto');
const e = require("express");
// file
fs = require('fs');

exports.uploadAvatar = (req, res) => {
    const onlyid = crypto.randomUUID();
    let oldName = req.files[0].filename;
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf-8');
    fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName);

    const sql = 'insert into sys_avt_images (imageurl, onlyid) values ($1, $2)'
    const values = [`http://172.16.206.127:3000/upload/${newName}`, onlyid]
    db.query(sql, values, (err, result) => {
        if (err) { return res.cc(err) }
        res.send({
            onlyid,
            status:0,
            url:'http://172.16.206.127:3000/upload/' + newName
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

// user control
exports.createSuperUser = (req, res) => {
    const {
        account,
        password,
        phone,
        email,
        name,
        sex,
        role,
        company,
        job
    } = req.body
    console.log(req.body)
    if (!account || !password) {
        return res.cc('account or password can not be null')
    }
    const sqls = 'select * from sys_users where account=$1'
    const user = [account];
    db.query(sqls, user, (err, result) => {
        if (result.rowCount !== 0) {
            return res.cc('account already exists!')
        } else {
            // encryption
            const pw = bcrypt.hashSync(password, 10)
            // insert
            const sqlin = "insert into sys_users (account, password, phone, email, job, company, role," +
                " status, createdate, name, sex) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ";
            const status = 'normal';
            const createdate = new Date();
            const value = [account, pw, phone, email, job, company, role, status, createdate, name, sex];
            db.query(sqlin, value, (err, result) => {
                if (result.rowCount !== 1) { return res.cc('register super user filed!') }
                return res.cc('super user register successfully', 0)
            })
        }
    })
}

exports.getSuperUserList = (req, res) => {
    let sql = "select * from sys_users"
    const admin = req.body.admin
    if (admin == 1) {
        sql = sql + " where role != 'user' order by id"
    } else {
        sql = sql + " where role = 'user' order by id"
    }
    db.query(sql, (err, result) => {
        if (err) { return res.cc(err) }
        const data = result.rows
        data.forEach(function(item){
            item.password = ''
        })
        res.send(data)
    })
}

exports.modifySuperUser = (req, res) => {
    const {
        id,
        name,
        sex,
        phone,
        email,
        role,
        company,
        job
    } = req.body
    const update = new Date();
    const sql = "update sys_users set name=$1, sex=$2, phone=$3, email=$4, role=$5, company=$6, job=$7, createdate=$8 where id = $9"
    db.query(sql, [name, sex, phone, email, role, company, job, update, id], (err, result) => {
      if  (result.rowCount !== 1) { return res.cc('modify super user filed!') }
      return res.cc('super user modified', 0)
    })
}

exports.SuperUser2User = (req, res) => {
    const role = 'user'
    const id = req.body.id
    const sql = "update sys_users set role=$1 where id=$2"
    db.query(sql, [role, id], (err, result) => {
        if  (result.rowCount !== 1) { return res.cc('downgrade failed!') }
        return res.cc('super user downgraded', 0)
    })
}

exports.User2SuperUser = (req, res) => {
    const role = req.body.role
    const id = req.body.id
    const sql = "update sys_users set role=$1 where id=$2"
    db.query(sql, [role, id], (err, result) => {
        if  (result.rowCount !== 1) { return res.cc('upgrade failed!') }
        return res.cc(`user changed to ${role}`, 0)
    })
}

exports.searchUser = (req, res) => {
    let sql = "select * from sys_users where lower(account) like $1"
    const account = req.body.account.toLowerCase()
    const admin = req.body.admin
    if (admin == 1) {
        sql = sql + " and role != 'user'"
    } else {
        sql = sql + " and role = 'user'"
    }
    const searchTerm = `%${account}%`
    db.query(sql, [searchTerm], (err, result) => {
        if (err) { return res.cc(err) }
        const data = result.rows
        data.forEach(function(item){
            item.password = ''
        })
        res.send(data)
    })
}

exports.freezeUser = (req, res) => {
    const sql = "update sys_users set status = 'frozen' where id = $1"
    db.query(sql, [req.body.id], (err, result) => {
        if (err) { return res.cc(err) }
        return res.cc(`user froze!`, 0)
    })
}

exports.thawUser = (req, res) => {
    const sql = "update sys_users set status = 'normal' where id = $1"
    db.query(sql, [req.body.id], (err, result) => {
        if (err) { return res.cc(err) }
        return res.cc(`user thawed!`, 0)
    })
}

exports.getAbnormalUser = (req, res) => {
    const sql = "select * from sys_users where status = 'frozen'"
    db.query(sql, (err, result) => {
        if (err) { return res.cc(err) }
        res.send(result)
    })
}

exports.deleteUser = (req, res) => {
    const sql = "delete from sys_users where id = $1"
    db.query(sql, [req.body.id], (err, result) => {
        const sql2 = "delete from image where account = $1"
        db.query(sql2, [req.body.account], (err, result) => {
            if (err) { return res.cc(err) }
            return res.cc(`user deleted!`, 0)
        })
    })
}