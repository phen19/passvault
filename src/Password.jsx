import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import API from "./constant";
import { useUserData } from "./UserContext";

function Password() {
    const [password, setPassword] = useState([]);
    const [userData, setUserData] = useUserData();
    const location = useLocation()
    const {passwordId} = useParams();
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }
    useEffect(() =>{
        console.log(location.state)
        const request = axios.get(`${API}/${location.state.categoria.name.toLowerCase()}/${passwordId}`, config);

        request.then((response) => {
            setPassword(response.data)
        }).catch((err => {
            console.error(err)
        }))
    }, [])

    function deletePassword(id){
        const confirm = window.confirm("Tem certeza que deseja excluir este link?"); 
        if(confirm){
            const request = axios.delete(`${API}/${location.state.categoria.name.toLowerCase()}/${id}`, config);
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