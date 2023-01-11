import React, { useState } from "react";
import logo from './headit.png';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        postData('HTTP://localhost:3001/auth', { email: email, password: password })
            .then((data) => {
                console.log(data);
            });

    }

    return (
        <div className="auth-form-container">
            <div className="logo">
                <img src={logo} alt="logo" width="100" height="100" margin="0 50px" margin-left="auto" margin-right="auto" />
            </div>

            <form className="login-form" onSubmit={handleSubmit} >
                <label htmlFor="email"> Email </label>
                <input value={email} onChange={(ev) => setEmail(ev.target.value)} type="email" placeholder="Digite seu email" id="email" name="email" />
                <label htmlFor="password"> Senha </label>
                <input value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder="Digite sua senha" id="password" name="password" />
                <div class="button">
                    <button type="submit" >Login</button>
                </div>
            </form>
            <button className="cad" onClick={() => props.onFormSwitch('register')}> Deseja se cadastrar? Clique aqui. </button>
        </div>
    )
} 
