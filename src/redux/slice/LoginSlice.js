import instanse from '../../axios'

export const isAuth = () => {
    if (window.localStorage.getItem('token') === null || window.localStorage.getItem('token') === undefined) {
        return false;
    } else {
        return true;
    }
}

export const fetchLogin = async (user) => {
    const { data } = await instanse.post('/user/login', user);
    console.log(data)
    if (data !== null && data !== undefined) {
        window.localStorage.setItem('token', data)
    }
}