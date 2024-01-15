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