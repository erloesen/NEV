import instance from "@/http/index.js";

// getuserinfo
export const getUserInfo = id => {
    return  instance({
        url: '/user/getUserinfo',
        method: 'POST',
        data: {
            id
        }
    })
}

// bind account and image
export const bindAccount = (account, url, onlyid) => {
    return  instance({
        url: '/user/bindAccount',
        method: 'POST',
        data: {
            account,
            url,
            onlyid
        }
    })
}

// modify password
export const changePassword = (id, oldpassword, newpassword) => {
    return  instance({
        url: '/user/changePassword',
        method: 'POST',
        data: {
            id,
            oldpassword,
            newpassword
        }
    })
}

// modify username
export const changeName = (id, name) => {
    return  instance({
        url: '/user/changeName',
        method: 'POST',
        data: {
            id,
            name
        }
    })
}

// modify email
export const changeEmail = (id, email) => {
    return  instance({
        url: '/user/changeEmail',
        method: 'POST',
        data: {
            id,
            email
        }
    })
}

// modify sex
export const changeSex = (id, sex) => {
    return  instance({
        url: '/user/changeSex',
        method: 'POST',
        data: {
            id,
            sex
        }
    })
}

