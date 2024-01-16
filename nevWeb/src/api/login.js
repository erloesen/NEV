import instance from "@/http/index.js";

// register
export const register = data => {
    const {
        account,
        password,
        phone,
        email,
        job,
        company
    } = data
    return  instance({
        url: '/api/register',
        method: 'POST',
        data: {
            account,
            password,
            phone,
            email,
            job,
            company
        }
    })
}

export const login = data => {
    const {
        account,
        password
    } = data
    return  instance({
        url: '/api/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}

// forgetPassword verify then reset
export const verify = data => {
    const {
        account,
        email
    } = data
    return  instance({
        url: '/user/verifyAccountAndEmail',
        method: 'POST',
        data: {
            account,
            email
        }
    })
}
export const resetPassword = (id, newpassword) => {
    return  instance({
        url: '/user/resetPassword',
        method: 'POST',
        data: {
            id,
            newpassword
        }
    })
}