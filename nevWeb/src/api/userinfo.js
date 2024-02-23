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

// 用户管理部分
export const createSuperUser = data => {
    return instance({
        url: 'user/createSuperUser',
        method: 'POST',
        data: data
    })
}

export const modifySuperUser = data => {
    return instance({
        url: 'user/modifySuperUser',
        method: 'POST',
        data: data
    })
}

export const getSuperUserList = (admin) => {
    return  instance({
        url: '/user/getSuperUserList',
        method: 'POST',
        data: {admin}
    })
}

export const SuperUser2User = id => {
    return  instance({
        url: '/user/SuperUser2User',
        method: 'POST',
        data: {
            id
        }
    })
}

export const User2SuperUser = (id, role) => {
    return  instance({
        url: '/user/User2SuperUser',
        method: 'POST',
        data: {
            id,
            role
        }
    })
}

export const searchUser = (account, admin) => {
    return  instance({
        url: '/user/searchUser',
        method: 'POST',
        data: {
            account,
            admin
        }
    })
}

export const freezeUser = id => {
    return  instance({
        url: '/user/freezeUser',
        method: 'POST',
        data: {
            id
        }
    })
}

export const thawUser = id => {
    return  instance({
        url: '/user/thawUser',
        method: 'POST',
        data: {
            id
        }
    })
}

export const getAbnormalUser = () => {
    return  instance({
        url: '/user/getAbnormalUser',
        method: 'POST'
    })
}

export const deleteUser = (id, account) => {
    return  instance({
        url: '/user/deleteUser',
        method: 'POST',
        data: {
            id,
            account
        }
    })
}