import React from "react";
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { isAuth, fetchLogin } from '../redux/slice/LoginSlice'


function Login() {
    const { register, handleSubmit } = useForm();

    if (isAuth()) {
        return <Navigate to="/" />
    }

    const onSubmit = async (values) => {
        let user = {
            login: values.login,
            password: values.password
        };
        await fetchLogin(user);
        return <Navigate to="/" />
    }

    return <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>Войти</div>
            <input {...register('login', { required: 'Укажите логин' })} placeholder='Логин' />
            <input {...register('password', { required: 'Укажите пароль' })} placeholder='Пароль' />
            <div>
                <button type="submit">Войти</button>
            </div>
            <div><a href='/registration'>Зарегестрироваться</a></div>
        </form>
    </div>
}

export default Login;