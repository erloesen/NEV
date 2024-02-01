const db = require('../db/index.js');

exports.getProCity = (req, res) => {
    const ProCity = () => {
        return new Promise(resolve => {
            const sql = 'select distinct province, city from company_attributes order by province, city'
            db.query(sql, (err, result) => {
                const data = result.rows;
                const transdata = {};
                data.forEach(item => {
                    const {province, city} = item;
                    if (!transdata[province]) {
                        transdata[province] = []
                    }
                    transdata[province].push(city)
                })
                resolve({
                    pro: Object.keys(transdata),
                    procity: transdata
                })
            })
        })
    }
    async function getData() {
        const result = await ProCity()
        res.send(result)
    }
    getData()
}

exports.getFaclist = (req, res) => {
    const proname = req.body.province
    const cityname = req.body.city
    const getFactory = () => {
        return new Promise(resolve => {
            const sql = 'select id, company from company_attributes where province = $1 and city = $2 order by id'
            db.query(sql, [proname, cityname], (err, result) => {
                const data = result.rows;
                resolve({
                    factory: data
                })
            })
        })
    }
    async function getData() {
        const result = await getFactory()
        res.send(result)
    }
    getData()
}

exports.getFacDetail = (req, res) => {
    const id = req.body.id
    const getFacinfo = () => {
        return new Promise(resolve => {
            const sql = 'select company_polygon_relation.id, company_polygon_relation.company, brand, province, city, county, dormitory, station, ST_X(ST_Centroid(wkt_mobile)) as x, ST_Y(ST_Centroid(wkt_mobile)) as y ' +
                               'from company_polygon_relation join company_attributes on company_polygon_relation.id=company_attributes.id where company_polygon_relation.id = $1'
            db.query(sql, [id], (err, result) => {
                const data = result.rows;
                resolve({
                    facinfo: data
                })
            })
        })
    }
    const getFacpop = () => {
        return new Promise(resolve => {
            const sql = "select to_char(date, 'YYYY/MM/DD') as date, last_cur_daytime_count as pop from raw_mobile where id = $1 and date >= '2023-01-01' order by date"
            db.query(sql, [id], (err, result) => {
                const data = result.rows;
                const date = []
                const pop = []
                data.forEach((item, index) => {
                    date.push(item.date)
                    pop.push(item.pop)
                })
                resolve({
                    facpopdate: date,
                    facpop: pop
                })
            })
        })
    }

    const getFaclbs = () => {
        return new Promise(resolve => {
            const sql = "select to_char(date, 'YYYY/MM/DD') as date, daytime_mean as lbs from process_tencent_pop where id = $1 and date >= '2023-01-01' order by date"
            db.query(sql, [id], (err, result) => {
                const data = result.rows;
                const date = []
                const lbs = []
                data.forEach((item, index) => {
                    date.push(item.date)
                    lbs.push(item.lbs)
                })
                resolve({
                    faclbsdate: date,
                    faclbs: lbs
                })
            })
        })
    }

    const getFacImgs = () => {
        return new Promise(resolve => {
            const sql = "select pid, imgdate from sys_fac_images where pid = $1 order by imgdate"
            db.query(sql, [id], (err, result) => {
                const data = result.rows;
                const imgdate = []
                data.forEach((item, index) => {
                    imgdate.push(item.imgdate)
                })
                resolve({
                    imgdate: imgdate
                })
            })
        })
    }

    async function getData() {
        const info = await getFacinfo()
        const pop = await getFacpop()
        const lbs = await getFaclbs()
        const img = await getFacImgs()
        const result = {...info, ...pop, ...lbs, ...img}
        res.send(result)
    }
    getData()
}