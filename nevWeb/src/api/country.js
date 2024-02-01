import instance from "@/http/index.js";

// country
export const getCountryIndex = () => {
    return  instance({
        url: '/country/getCountryIndex',
        method: 'POST'
    })
}

export const getCountryPop = () => {
    return  instance({
        url: '/country/getCountryPop',
        method: 'POST'
    })
}

export const getCountryRawIndex = (col) => {
    return  instance({
        url: '/country/getCountryRawIndex',
        method: 'POST',
        data: {
            col
        }
    })
}