import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
function Password() {
    const [password, setPassword] = useState([]);
    const {user} = useContext(UserContext);
    const location = useLocation()
    const {passwordId} = useParams();
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }
    useEffect(() =>{
        console.log(location.state)
        const request = axios.get("http://localhost:5000/" + location.state.categoria.name.toLowerCase() + "/" + passwordId ,config);

        request.then((response) => {
            setPassword(response.data)
        }).catch((err => {
            console.error(err)
        }))
    }, [])

    function deletePassword(id){
        const confirm = window.confirm("Tem certeza que deseja excluir este link?"); 
        if(confirm){
            const request = axios.delete("http://localhost:5000/" + location.state.categoria.name.toLowerCase() + "/" + id, config);
            request.then(response => {
                navigate("/homePage")
            });
            request.catch(error => {
                console.error("Não foi possível deletar a senha")
                console.error(error)
            })
        }
    }
    return (
        <>
        <div id={password.id}>
            <p>Nome: {password.title}</p>
            <p>Rede: {password.networkName}</p>
            <p>Senha: {password.password}</p>
            <p onClick={()=> deletePassword(password.id)}>X</p>
        </div>
        </>
    )
}

export default Password