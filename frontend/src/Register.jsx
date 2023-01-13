import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();

    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        postData('HTTP://localhost:3001/register', { username: username, email: email, password: password })
            .then((data) => {
                console.log(data);
            });
    }

    return (
        <div className="auth-form-container">
            <h2>Registro</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="username" > Nome de usuário </label>
                <input value={username} onChange={(ev) => setUsername(ev.target.value)} username="username" id="username" placeholder="Digite um nome de usuário" />
                <label htmlFor="email"> Email </label>
                <input value={email} onChange={(ev) => setEmail(ev.target.value)} type="email" placeholder="Digite seu email" id="email" name="email" />
                <label htmlFor="password"> Senha </label>
                <input value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder="Digite sua senha" id="password" name="password" />
                <button type="submit" >Registrar</button>
            </form>
            <button className="button-reg2" onClick={() => props.onFormSwitch('login')}> Já possui conta? Clique aqui </button>
        </div>
    )
} 
