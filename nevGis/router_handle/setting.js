const db = require('../db/index.js');

exports.uploadSwiper = (req, res) => {
    const key = req.body.set_name
    let oldName = req.files[0].filename;
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf-8');
    fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName);
    const sql = 'update into sys_setting set set_value = $1 where set_name = $2'
    const values = [`http://localhost:3000/upload/${newName}`, key]
    db.query(sql, values, (err, result) => {
        if (err) { return res.cc(err) }
        res.send({
            status:0,
            url:'http://localhost:3000/upload/' + newName,
            message:'swiper updated'
        })
    })
}

exports.getSwipers = (req, res) => {
    const sql = "select * from sys_setting where set_name like 'swiper%'"
    db.query(sql, (err, result) => {
        if (err) { return res.cc(err) }
        res.send({
            status:0,
            message:'get swiper image successfully',
            data: result.rows
        })
    })

}

// get company and change it
exports.getCompanyInfo = (req, res) => {
    const sql = "select * from sys_setting where set_name = 'company'"
    db.query(sql, (err, result) => {
        if (err) { return res.cc(err) }
        res.send(result.rows[0].set_value)
    })
}
exports.changeCompanyInfo = (req, res) => {
    const sql = "update sys_setting set set_value = $1 where set_name = 'company'"
    db.query(sql, [req.body.set_value], (err, result) => {
        if (err) { return res.cc(err) }
        res.cc('company updated', 0)
    })
}

// edit information on home page
exports.getInfo = (req, res) => {
    const sql = "select set_value from sys_setting where set_name = $1"
    db.query(sql, [req.body.set_name], (err, result) => {
        if (err) { return res.cc(err) }
        res.send(result.rows[0].set_value)
    })
}

exports.getAllInfo = (req, res) => {
    const sql = "select * from sys_setting where set_name not like 'swiper%'"
    db.query(sql, (err, result) => {
        if (err) { return res.cc(err) }
        res.send(result.rows)
    })
}

exports.changeInfo = (req, res) => {
    const sql = "update sys_setting set set_value = $1 where set_name = $2"
    db.query(sql, [req.body.set_value, req.body.set_name], (err, result) => {
        if (err) { return res.cc(err) }
        res.cc(`${req.body.set_name} updated`, 0)
    })
}