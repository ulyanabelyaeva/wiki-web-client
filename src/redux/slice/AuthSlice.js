import instanse from '../../axios'

export const isAuth = () => {
    if (window.localStorage.getItem('token') === null || window.localStorage.getItem('token') === undefined) {
        return false;
    } else {
        return true;
    }
}

export const fetchLogin = async (user) => {
    try{
        const { data } = await instanse.post('/user/login', user);
        if (data !== null && data !== undefined) {
            window.localStorage.setItem('token', data)
        }
    } catch{
        alert('Неверные данные');
    }
}

export const fetchCreateUser = async (user) => {
    await instanse.post('/user/create', user);
}