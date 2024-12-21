import { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
const categorias = [
    {"wifis":["networkName", "title", "password"], "name": "Wifis", "id": 1}, 
    {"credentials":["url", "title", "username", "password"], "name": "Credentials", "id": 2}, 
    {"cards": ["title", "cardHolderName", "number", "securityCode", "expireDate", "password", "isVirtual", "type"], "name":"Cards", "id": 3}, 
    {"documents":["fullName", "type", "emissionDate", "expireDate", "number", "issuer"], "name": "Documents", "id": 4},
    {"notes": ["title", "note"],"name":"Notes", "id": 5}
];
function HomePage() {
    const {user} = useContext(UserContext);
    const config = useMemo(() => ({ 
        headers: { 
            Authorization: `Bearer ${user.token}` 
        } 
    }), [user.token]); 
    
    const [passwords, setPasswords] = useState({});

    useEffect(() =>{
        categorias.forEach(categoria => {

            const request = axios.get("http://localhost:5000/" + categoria.name.toLowerCase(),config);
    
            request.then((response) => {
                setPasswords(prevPasswords => ({ ...prevPasswords, [categoria.name]:response.data}))
                console.log(response.data)
            }).catch((err => {
                console.error(err)
            }))
        })
    }, [categorias, config])

    const navigate = useNavigate();
    function handleClick(categoria, passwords){
        console.log({categoria, passwords})
        navigate('/passwords', {state:{categoria, passwords}})
    }
    return (
        <>
            {categorias.map(categoria => {return (
                <>
                {
                    <div onClick={()=> handleClick(categoria, passwords[categoria.name])}> 
                    {categoria.name} {passwords[categoria.name] && passwords[categoria.name].length > 0 ? passwords[categoria.name].length : 0}
                    </div> 
                }

                </>
            )
            })}
        </>
    )
}

export default HomePage
  