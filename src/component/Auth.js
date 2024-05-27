import React from "react";
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { isAuth, fetchLogin, fetchCreateUser } from '../redux/slice/AuthSlice'

import '../style/Auth.css'


function Auth() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    if (isAuth()) {
        return <Navigate to="/" />
    }

    const onSubmit = async (values) => {
        if (values.repass !== '') {
            if (values.repass !== values.password) {
                alert("Пароли не совпадают");
                return;
            } else {
                let user = {
                    login: values.login,
                    password: values.password
                };
                await fetchCreateUser(user);
                return navigate("/");
            }
        } else {
            let user = {
                login: values.login,
                password: values.password
            };
            await fetchLogin(user);
            return navigate("/");
        }
    }

    return <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <input checked={true} id="signin" name="action" type="radio" value="signin" readOnly={true} />
            <label for="signin">Войти</label>
            <input id="signup" name="action" type="radio" value="signup" />
            <label for="signup">Зарегистироваться</label>
            <div id="wrapper">
                <div id="arrow"></div>
                <input {...register('login')} id="login" placeholder="Логин" type="text" autocomplete="off" />
                <input {...register('password')} id="pass" placeholder="Пароль" type="password" />
                <input {...register('repass')} id="repass" placeholder="Повторите пароль" type="password" />
            </div>
            <button className="btn-submit" type="submit">
                <span>
                    <br />
                    Готово
                    <br />
                    Готово
                </span>
            </button>
        </form>
    </div>
}

export default Auth;