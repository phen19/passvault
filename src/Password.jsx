import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {API} from "./constant";
import { useUserData } from "./UserContext";
import {Box, Paper} from '@mui/material';
import {styled as muiStyled} from "@mui/system"
import Header from "./Header";
import {Delete, ArrowBack} from '@mui/icons-material';
import {Container, Buttons} from "./assets/Styled";
import  {TailSpin}  from  'react-loader-spinner'


const Item = muiStyled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme?.typography?.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme?.palette?.text?.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027'
    }),
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    ":hover":{
        backgroundColor: '#e7dbc3',
        cursor: 'pointer'
    }
  }));

function Password() {
    const [password, setPassword] = useState([]);
    const [userData] = useUserData();
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const {passwordId} = useParams();
    const navigate = useNavigate();
    let loadingAnimation = <TailSpin color="#4fa94d" height={45} width={60} />
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }
    useEffect(() =>{
        setLoading(true);
        const request = axios.get(`${API}/${location?.state?.categoria?.name.toLowerCase()}/${passwordId}`, config);

        request.then((response) => {
            setPassword(response.data)
            setLoading(false);
        }).catch((err => {
            console.error(err)
        }))
    }, [])

    function deletePassword(id){
        const confirm = window.confirm("Tem certeza que deseja excluir este item?"); 
        if(confirm){
            const request = axios.delete(`${API}/${location?.state?.categoria?.name.toLowerCase()}/${id}`, config);
            request.then(response => {
                navigate("/homePage")
            });
            request.catch(error => {
                console.error("Não foi possível deletar a senha")
                console.error(error)
            })
        }
    }

    function renderPassword(){            
            let keys = location.state.categoria[location.state.categoria.name.toLowerCase()]
            return(
                <>
                <Item sx={{width: "350px", display: "flex", textAlign: "left", justifyContent: "space-between", alignItems: "center"}}>
                    <div id={password.id} style={{display: "flex", alignItems: "center", width: "100%", color: "#605e5a"}}>
                        <div>
                            {keys.map(key => {
                                return (
                                    <p>{key.label} :</p>
                                )
                            })}
                        </div>
                        <div style={{marginLeft: 10}}>
                            {keys.map(key => {
                                    return (
                                        <p>{password[key.fieldName]}</p>
                                    )
                                })}
                        </div>
                    </div>
                    <div>
                        <Delete onClick={()=> deletePassword(password.id)}/>
                    </div>
                </Item>
                <Buttons onClick={()=> navigate(-1)}>
                    <ArrowBack sx={{color: "#605e5a", fontSize: 40}}/> 
                </Buttons>
                </>
            )
        
    }
    return (
        <>
        <Container>
            <Header />
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: 5}}>
                {loading ? loadingAnimation : renderPassword()}
            </Box>
        </Container>
        </>
    )
}

export default Password