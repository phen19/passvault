import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";

function SignIn() {
  const {user, setUser } = useContext(UserContext);
  
  const {register, handleSubmit, formState: {errors}} = useForm();
  const navigate = useNavigate();

  function sendForm(data){
    const request = axios.post("http://localhost:5000/signIn", data);
    
    request.then((response) => {
      setUser({userId: response.data.userId,token: response.data.token});
      navigate("/homePage")
    })
    request.catch((error)=> {alert(error.response.data)})
  }

  return (
    <>
        <Container>
          <div className = "logo">
            PASSVAULT 🔏
          </div>
            <Form>
              <input 
                type="text" 
                placeholder="E-mail" 
                className={errors?.email && "input-error"}
                {...register("email", {required: true})}
              />
              {errors?.email?.type === "required" && <p className="error-message"> Email is required</p>}
              <input 
                type="password" 
                placeholder="Senha"
                className={errors?.password && "input-error"}
                {...register("password", {required: true, minLength: 10})}
              />
              {errors?.password?.type === "required" && <p className="error-message"> Password is required</p>}
              {errors?.password?.type === "minLength" && <p className="error-message"> Password must have at least 10 characters </p>}
              <button onClick = {(e) => 
                {
                  e.preventDefault()
                  handleSubmit(sendForm)()
                }
                }>ENTRAR</button>

            </Form>
            <Link to="/signUp">
              Não tem conta? cadastre-se aqui
            </Link>
        </Container>
    </>
  )
}

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
