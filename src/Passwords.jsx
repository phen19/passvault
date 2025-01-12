import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserData } from "./UserContext";

function Passwords() {
    const [userData, setUserData] = useUserData();
    const location = useLocation()
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }
    const navigate = useNavigate()

    function handleClick(id){
        console.log(id)
        navigate('/password/'+location.state.categoria.name.toLowerCase()+ "/"+ id, {state:location.state})
    }

    function addNew(){
        navigate('/addNewPassword', {state:location.state})
    }
    return (
        <>
            <div>

                <div onClick={()=> addNew()}>ADICIONAR SENHA CLIQUE AQUI   </div>        
                    {location.state.passwords.map(password => {
                        return(
                            <div key={password.id} onClick={()=> handleClick(password.id)}>
                                <p>Nome: {password.title}</p>
                                <p>Rede: {password.networkName}</p>
                            </div>
                        )
                    })}
                
            </div>
            
        </>
    )
}

export default Passwords