const db = require('../db/index.js');

exports.getCountryIndex = (req, res) => {
    const CountryIndex = () => {
        return new Promise(resolve => {
            const sql = 'select year, month, fa, adddate from score_country order by year, month'
            db.query(sql, (err, result) => {
                const data = result.rows;
                let dict = {};
                let score = [];
                for (let i=0; i<data.length; i++) {
                    score.push(data[i].fa)
                    if (data[i].month == 12) {
                        dict[data[i].year] = score
                        score = []
                    }
                }
                // const lastupdate = data.slice(-1)[0].adddate;
                // const y = lastupdate.getFullYear();
                // const m = String(lastupdate.getMonth() + 1).padStart(2, '0'); // 注意月份是从 0 开始计数
                // const d = String(lastupdate.getDate()).padStart(2, '0');
                // const formattedDateString = `${y}-${m}-${d}`;

                resolve({
                    year: Object.keys(dict),
                    data: dict
                })
            })
        })
    }
    async function getData() {
        const result = await CountryIndex()
        res.send(result)
    }
    getData()
}

exports.getCountryPop = (req, res) => {
    const CountryPop = () => {
        return new Promise(resolve => {
            const sql = 'select year, month, pmgrowth, owcratio_raw, pmcindex_raw from variable_country order by year, month'
            db.query(sql, (err, result) => {
                const data = result.rows;
                let pmgdict = {};
                let owcdict = {};
                let pmcdict = {};
                let pmgscore = [];
                let owcscore = [];
                let pmcscore = [];
                for (let i=0; i<data.length; i++) {
                    pmgscore.push(data[i].pmgrowth)
                    owcscore.push(data[i].owcratio_raw)
                    pmcscore.push(data[i].pmcindex_raw)
                    if (data[i].month == 12) {
                        pmgdict[data[i].year] = pmgscore
                        owcdict[data[i].year] = owcscore
                        pmcdict[data[i].year] = pmcscore
                        pmgscore = []
                        owcscore = []
                        pmcscore = []
                    }
                }
                resolve({
                    year: Object.keys(pmgdict),
                    pmg: pmgdict,
                    owc: owcdict,
                    pmc: pmcdict
                })
            })
        })
    }
    async function getData() {
        const result = await CountryPop()
        res.send(result)
    }
    getData()
}

exports.getCountryRawIndex = (req, res) => {
    const variable = req.body.col;

    const CountryRaw = (col) => {
        return new Promise(resolve => {
            const sql = `select year, month, ${col} from variable_country order by year, month`
            db.query(sql, (err, result) => {
                const data = result.rows;
                let vardict = {};
                let varscore = [];
                for (let i=0; i<data.length; i++) {
                    varscore.push(parseInt(data[i][col]))
                    if (data[i].month == 12) {
                        vardict[data[i].year] = varscore
                        varscore = []
                    }
                }
                resolve({
                    year: Object.keys(vardict),
                    var: vardict
                })
            })
        })
    }
    async function getData() {
        const result = await CountryRaw(variable)
        res.send(result)
    }
    getData()
}