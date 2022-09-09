import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  // Define uma função de POST
  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response;
  }

  // Define uma função que será ativada no click
  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    console.log(uname.value, pass.value)
    postData('HTTP://127.0.0.1:3001/register', { username: uname.value, password: pass.value })
      .then((data) => {
        if (data.status === 201) {
          console.log("Registro com sucesso!");
        } else if (data.status === 500) {
          data.json().then((log) => {
            console.log(log);
          });
        }
      });
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
       <div className="input-container">
         <input placeholder="Username" type="text" name="uname" required />
       </div>
       <div className="input-container">
         <input placeholder="Password" type="password" name="pass" required />
       </div>
       <div className="button-container">
         <input type="submit" />
       </div>
     </form>
    </div>
  )
}

export default App
