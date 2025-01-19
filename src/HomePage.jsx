import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LockIcon from '@mui/icons-material/Lock';
import { Badge, Box, Paper, Stack } from "@mui/material";
import { useUserData } from "./UserContext";
import {API, categorias} from "./constant";
import Header from "./Header";
import {styled as muiStyled} from "@mui/system"
import  {TailSpin}  from  'react-loader-spinner'
import { Container } from "./assets/Styled";

const Item = muiStyled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme?.typography?.body2,
    padding: theme?.spacing(1),
    textAlign: 'center',
    color: theme?.palette?.text?.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027'
    }),
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    ":hover":{
        backgroundColor: '#4fa94d',
        cursor: 'pointer'
    }
}));

const StyledBadge = muiStyled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme?.palette?.background?.paper}`,
    padding: '0 4px',
    },
}));

function HomePage() {
    const [userData, setUserData] = useUserData();
    const config = useMemo(() => ({ 
        headers: { 
            Authorization: `Bearer ${userData.token}` 
        },
        timeout: 10000
    }), [userData.token]); 
    
    const [passwords, setPasswords] = useState({});
    const [loading, setLoading] = useState(false);
    let loadingAnimation = <TailSpin color="#4fa94d" height={45} width={60} />
    
    useEffect(() =>{
        categorias.forEach(categoria => {
            setLoading(true);
            const request = axios.get(`${API}/${categoria.name.toLowerCase()}` , config);
            request.then((response) => {
                setPasswords(prevPasswords => ({ ...prevPasswords, [categoria.name]:response.data}))
                setLoading(false);
            }).catch((err => {
                if(err.code === 'ECONNABORTED'){
                    console.error('Timeout')
                }else {
                    console.error(err)
                }
            }))
        })
    }, [categorias, config])

    const navigate = useNavigate();

    function handleClick(categoria, passwords){
        navigate('/passwords', {state:{categoria, passwords}})
    }

    function renderPasswordsCategories(){
        return (
                <Stack spacing={2}>
                    {categorias.map((categoria,idx) => {return (
                        <Item sx={{width: "350px", paddingRight: '20px'}}key={idx} onClick={()=> handleClick(categoria, passwords[categoria.name])}>
                        <div key={idx}> {categoria.name} </div>
                            <StyledBadge badgeContent={passwords[categoria.name]?.length} color='secondary' showZero>
                                <LockIcon color="primary" />
                            </StyledBadge>
                        </Item> 
                    )})}
                </Stack>
        )
    }
    return (
        <>
            <Container>
                <Header />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: 5 }}>
                    {loading ? loadingAnimation : renderPasswordsCategories()}
                </Box>
            </Container>
        </>
    )
}

export default HomePage
  