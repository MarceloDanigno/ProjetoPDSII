import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { Homepage } from "./Homepage";


function App() {
  let [currentForm, setCurrentForm] = useState('Homepage');
  console.log(currentForm);
  const toggleForm = (formName) =>  {
    setCurrentForm(formName);
    currentForm = formName;
  }


  return (
    <div className="App">
    {
      currentForm === "Homepage" ? <Homepage onFormSwitch = {toggleForm} /> : 
      (currentForm === "login" ? <Login onFormSwitch = {toggleForm} /> : <Register onFormSwitch = {toggleForm}/>)
    }
    </div>
  );
}

export default App;
