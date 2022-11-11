import React, { useState } from "react";

export const Register = (props) => { 
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState ('');
        const [username, setUsername] = useState ('');

        const handleSubmit = (ev) => {
            ev.preventDefault();
            console.log(email);        
        }

    return (
        <div className = "auth-form-container">
            <h2>Registrar</h2>
            <form className = "register-form" onSubmit = {handleSubmit}>
                <label htmlFor = "username" > Nome de usuário </label>
                <input value = {username} onChange={(ev) => setUsername(ev.target.value)} username = "username" id = "username" placeholder = "Digite um nome de usuário" />
                <label htmlFor = "email"> Email </label>
                <input value = {email} onChange={(ev) => setEmail(ev.target.value)} type = "email" placeholder = "Digite seu email" id = "email" name = "email" /> 
                <label htmlFor = "password"> Senha </label>
                <input value = {password} onChange={(ev) => setPassword(ev.target.value)} type = "password" placeholder = "Digite sua senha" id = "password" name = "password" /> 
                <button type = "submit" >Login</button>
            </form>
            <button className = "link-btn" onClick = {() => props.onFormSwitch('login')}> Já possui conta? Clique aqui. </button>
        </div>
    )
} 