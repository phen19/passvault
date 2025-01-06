import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import {styled as muiStyled} from "@mui/system"
import logo from './assets/log.png';
import API from "./constant";

const StyledTextField = muiStyled(TextField)({
  marginBottom: '16px',
})

function SignIn() {
  const {user, setUser } = useContext(UserContext);
  
  const {control, register, handleSubmit, formState: {errors}} = useForm();
  const navigate = useNavigate();

  function sendForm(data){
    const request = axios.post(`${API}/signIn`, data);
    
    request.then((response) => {
      setUser({userId: response.data.userId,token: response.data.token});
      navigate("/homePage")
    })
    request.catch((error)=> {alert(error.response.data)})
  }

  return (
    <>
        <Container>
            <Logo> <img src={logo} alt="PASSVAULT Logo" /> </Logo>
            <Form>
              <Controller
                name="email"
                control = {control}
                defaultValue=""
                rules = {{required: "Email is required"}}
                render = {({ field}) =>
                  <StyledTextField
                    {...field}
                    type="text"
                    placeholder = "E-mail"
                    label= "E-mail"
                    variant = "outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                }
              />
              <Controller
                name="password"
                control = {control}
                defaultValue=""
                rules={{required: "Password is required", minLength: {value:10, message: "Password must have at least 10 characters"}}}
                render = {({ field}) =>
                  <StyledTextField
                    {...field}
                    type="password"
                    placeholder = "Senha"
                    label= "Senha"
                    variant = "outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                }
              />
              <Button 
                onClick = {(e) => 
                  {
                    e.preventDefault()
                    handleSubmit(sendForm)()
                  }
                }
                variant="contained"
                color="success"
              >
                ENTRAR
              </Button>

            </Form>
            <Link to="/signUp">
              Não tem conta? cadastre-se aqui
            </Link>
        </Container>
    </>
  )
}

const Logo =  styled.div` 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin-bottom: 20px; 
  img { 
    //width: 150px; // Ajuste conforme necessário 
    height: auto; 
  } 
`
const Container = styled.div `
  background-color: #e7dbc3;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Form = styled.form `
  display: flex;
  flex-direction: column;
  margin: 0 2vw 0 2vw;
  align-items: center;

  input{
    width: 350px;
  }
  
  button{
    width: 350px;
  }

  .input-error{
    outline: 1px solid rgb(255, 72, 72);
  }
  
  .error-message{
    color: rgb(255, 72, 72)
  }
`

export default SignIn
