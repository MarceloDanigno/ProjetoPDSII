import React, { useState } from "react";
import { Helmet } from "react-helmet";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { Homepage } from "./Homepage";



function App() {
  let [currentForm, setCurrentForm] = useState('Homepage');
  console.log(currentForm);
  const toggleForm = (formName) => {
    setCurrentForm(formName);
    currentForm = formName;
  }


  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>HeadIt</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Name Change" />
      </Helmet>
      {
        currentForm === "Homepage" ? <Homepage onFormSwitch={toggleForm} /> :
          (currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />)
      }
    </div>
  );
}





export default App;
