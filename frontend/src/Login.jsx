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

            <button className="logologin" onClick={() => props.onFormSwitch('Homepage')}>
                <img src={logo} width="120" height="120" />
            </button>

            <form className="login-form" onSubmit={handleSubmit} >
                <label htmlFor="email"> Email </label>
                <input value={email} onChange={(ev) => setEmail(ev.target.value)} type="email" placeholder="Digite seu email" id="email" name="email" />
                <label htmlFor="password"> Senha </label>
                <input value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder="Digite sua senha" id="password" name="password" />

                <div>

                    <button className="button-lgn2" type="submit" >Login</button>
                    <button className="button-cad2" onClick={() => props.onFormSwitch('register')}> Deseja se cadastrar?<br></br>Clique aqui </button>


                </div>


            </form>

        </div>
    )
} 
