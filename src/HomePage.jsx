import { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
import styled from "styled-components";
import LockIcon from '@mui/icons-material/Lock';
import { Badge } from "@mui/material";
import Stack from '@mui/material/Stack';

const categorias = [
    {"wifis":[
        {"fieldName": "networkName", "fieldType": "text", "label": "Nome da Rede"},
        {"fieldName":"title", "fieldType": "text", "label": "Título"},
        {"fieldName": "password", "fieldType":"text", "label": "Senha"}
    ], "name": "Wifis", "id": 1},
    {"credentials":
        [
            {"fieldName": "url", "fieldType": "text", "label": "URL"},
            {"fieldName": "title", "fieldType": "text", "label": "Título"},
            {"fieldName": "username", "fieldType": "text", "label": "Nome de usuário" },
            {"fieldName": "password", "fieldType": "text", "label": "Senha"}
        ], "name": "Credentials", "id": 2}, 
    {"cards": [
        {"fieldName": "title", "fieldType": "text", "label": "Nome do Cartão"},
        {"fieldName": "cardHolderName", "fieldType": "text", "label": "Titular do Cartão"},
        {"fieldName": "number", "fieldType": "number", "label": "Número do Cartão"},
        {"fieldName": "securityCode", "fieldType": "number", "label": "Código de Segurança"},
        {"fieldName": "expireDate", "fieldType": "date", "label": "Data de Expiração"},
        {"fieldName": "password", "fieldType": "text", "label": "Senha"},
        {"fieldName": "isVirtual", "fieldType": "checkbox", "label": "É virtual?"},
        {"fieldName": "type", "fieldType": "select", "label": "Tipo do cartão"}
    ], "name":"Cards", "id": 3}, 
    {"documents":[
        {"fieldName": "fullName", "fieldType": "text", "label": "Nome Completo"},
        {"fieldName": "type", "fieldType": "select", "label": "Tipo do Documento"},
        {"fieldName": "emissionDate", "fieldType": "date", "label": "Data de Emissão"},
        {"fieldName": "expireDate", "fieldType": "date", "label": "Data de Expiração"},
        {"fieldName": "number", "fieldType": "number", "label": "Número do Documento"},
        {"fieldName": "issuer", "fieldType": "text", "label": "Emissor"},
    ], "name": "Documents", "id": 4},
    {"notes": [
        {"fieldName": "title", "fieldType": "text", "label": "Nome"},
        {"fieldName": "note", "fieldType": "text", "label": "Nota"},
    ],"name":"Notes", "id": 5}
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
            <Container>

                    {categorias.map(categoria => {return (
                        <>
                        {
                            <Categoria onClick={()=> handleClick(categoria, passwords[categoria.name])}>
                            <div> {categoria.name} </div>
                            <Badge badgeContent={passwords[categoria.name]?.length} color="error" showZero>
                                <LockIcon color="primary" />
                            </Badge>
                            </Categoria> 
                        }

                        </>
                    )
                    })}
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

const Categoria = styled.div `
    width: 25vw;
    height: 40px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: white;
    font-family: "Josefin Sans", sans-serif;
    .qtd:hover{
        background-color: pink;
    }

    .qtd{
        background-color: blue;
        width: 30px;
        height: 30px;
        color: red;
        border-radius: 50%;
        display:flex;
        align-items:center;
        justify-content: center;
    }
`



export default HomePage
  