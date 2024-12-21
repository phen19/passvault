import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";

function SignIn() {
  const {user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function sendForm(){
    let data = {email, password}
    const request = axios.post("http://localhost:5000/signIn", data);
    
    request.then((response) => {
      setUser({userId: response.data.userId,token: response.data.token});
      navigate("/homePage")
    })
    request.catch((error)=> {alert(error.response.data)})
  }

  return (
    <>
        <div>
            <form onSubmit={(e) => 
              {
                e.preventDefault()
                sendForm()
              }
            }>
              <input type="text" placeholder="E-mail" value ={email} onChange={(e)=> setEmail(e.target.value)} required/>
              <input type="password" placeholder="Senha" value ={password} onChange={(e)=> setPassword(e.target.value)} required/>
              <button type="submit">Enviar</button>
            </form>
        </div>
        <Link to="/signUp">
          Não tem conta? cadastre-se aqui
        </Link>
    </>
  )
}

export default SignIn
