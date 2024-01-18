const db = require('../db/index.js');

exports.uploadSwiper = (req, res) => {
    let str = ''
    let oldName = req.files[0].filename;
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf-8');
    fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName);
    const sql = 'update into sys_setting set set_value = $1 where set_name = $2'
    const values = [`http://localhost:3000/upload/${newName}`, str]
    db.query(sql, values, (err, result) => {
        if (err) { return res.cc(err) }
        res.send({
            status:0,
            url:'http://localhost:3000/upload/' + newName,
            message:'swiper updated'
        })
    })
}

exports.uploadSwiper = (req, res) => {
    let str = ''
    let oldName = req.files[0].filename;
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf-8');
    fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName);
    const sql = 'update into sys_setting set set_value = $1 where set_name = $2'
    const values = [`http://localhost:3000/upload/${newName}`, str]
    db.query(sql, values, (err, result) => {
        if (err) { return res.cc(err) }
        res.send({
            status:0,
            url:'http://localhost:3000/upload/' + newName,
            message:'swiper updated'
        })
    })
}