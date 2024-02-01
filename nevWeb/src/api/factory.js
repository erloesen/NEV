import instance from "@/http/index.js";

// country
export const getProCity = () => {
    return  instance({
        url: '/factory/getProCity',
        method: 'POST'
    })
}

export const getFaclist = (province, city) => {
    return instance({
        url: '/factory/getFaclist',
        method: 'POST',
        data: {
            province,
            city
        }
    })
}

export const getFacDetail = (id) => {
    return instance({
        url: '/factory/getFacDetail',
        method: 'POST',
        data: {
            id
        }
    })
}