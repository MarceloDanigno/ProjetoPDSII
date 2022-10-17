import './App.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";

function App() {
  const handleClickRegister = (values) => console.log(values);
  const handleClickLogin = (values) => console.log(values);

  //Campo de validação

  const validationLogin = yup.object().shape({
    
    email: yup
    .string()
    .email()
    .required(" Email obrigatório"),
    
    password: yup
    .string()
    .min(10, " Tamanho mínimo de 10 caracteres")
    .required(" Senha obrigatória")
  });

  const validationRegister = yup.object().shape({
    
    email: yup
    .string()
    .email()
    .required(" Email obrigatório"),
    
    password: yup
    .string()
    .min(10, " Tamanho mínimo de 10 caracteres")
    .required(" Senha obrigatória"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas incompatíveis"),
  });

  return (
  <div className="container">
    
    <h1>Login</h1>

    <Formik
    initialValues={{}} onSubmit={handleClickLogin}
    validationSchema= {validationLogin}>
   
      <Form className= "login-form">
        <div className= "login-form-group">
          <Field name= "email" className= "form-field"
          placeholder= "Email"
          />  

          <ErrorMessage
            component = "spam"
            name = "email"
            className ="form-error"
          />

        </div>

        <div className= "login-form-group">
          <Field 
          name= "password" 
          className= "form-field" 
          placeholder= "Senha"
          />  

          <ErrorMessage
            component = "spam"
            name = "password"
            className ="form-error"
          />
          
        </div>
        <button className="button" type="submit">
            Login
        </button>

      </Form>
    </Formik>
    
    {/*######################################### CADASTRO #########################################*/}

    <h1>Cadastro</h1>
    <Formik
    initialValues={{}} onSubmit={handleClickRegister}
    validationSchema= {validationRegister}>
   
      <Form className= "login-form">
        <div className= "login-form-group">
          <Field 
          name= "email" 
          className= "form-field"
          placeholder= "Email"
          />  

          <ErrorMessage
            component = "spam"
            name = "email"
            className ="form-error"
          />

        </div>

        <div className= "login-form-group">
          <Field 
          name= "password" 
          className= "form-field" 
          placeholder= "Senha"
          />  

          <ErrorMessage
            component = "spam"
            name = "password"
            className ="form-error"
          />
          
        </div>
        <div className= "login-form-group">
          <Field 
          name= "confirmPassword" 
          className= "form-field" 
          placeholder= "Confirme sua senha"
          />  

          <ErrorMessage
            component = "spam"
            name = "confirmPassword"
            className ="form-error"
          />
          
        </div>
        <button className="button" type="submit">
            Cadastrar
        </button>

      </Form>
    </Formik>
   
  </div>
  );
}

export default App;
