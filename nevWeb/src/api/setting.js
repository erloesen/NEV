import instance from "@/http/index.js";

// get all swipers(6)
export const getSwipers = () => {
    return  instance({
        url: '/set/getSwipers',
        method: 'POST'
    })
}

// get company name
export const getCompanyInfo = () => {
    return  instance({
        url: '/set/getCompanyInfo',
        method: 'POST',
    })
}

// change company name
export const changeCompanyInfo = set_value => {
    return  instance({
        url: '/set/changeCompanyInfo',
        method: 'POST',
        data: {
            set_value
        }
    })
}

// get info by set_name
export const getInfo = set_name => {
    return  instance({
        url: '/set/getInfo',
        method: 'POST',
        data: {
            set_name
        }
    })
}

// change info by set_name
export const changeInfo = (set_name, set_value) => {
    return  instance({
        url: '/set/changeInfo',
        method: 'POST',
        data: {
            set_name,
            set_value
        }
    })
}

export const getAllInfo = () => {
    return  instance({
        url: '/set/getAllInfo',
        method: 'POST'
    })
}

