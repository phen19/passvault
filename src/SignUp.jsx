import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    function sendForm(data){
        //let data = {email, password}
        const request = axios.post("http://localhost:5000/signUp", data);
        
        request.then((response) => {
            navigate("/signIn")
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
                    }>CADASTRAR</button>

                </Form>
                <Link to="/signIn">
                Já possui conta? logue-se aqui
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
  padding-top: 100px
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

export default SignUp  