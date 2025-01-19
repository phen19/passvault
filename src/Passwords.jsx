import { useLocation, useNavigate } from "react-router-dom";
import {Box, Paper, Stack} from '@mui/material';
import {styled as muiStyled} from "@mui/system"
import Header from "./Header";
import {AddCircle, ArrowBack} from '@mui/icons-material';
import { Buttons, Container, CategoryName } from "./assets/Styled";

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

function Passwords() {
    const location = useLocation()
    const navigate = useNavigate()

    function handleClick(id){ 
        if (location.state && location.state.categoria) { 
            navigate('/password/'+location.state.categoria.name.toLowerCase()+ "/" + id, {state: location.state}); 
        } else { 
            console.error('Categoria não definida em location.state'); 
        } 
    }
    function addNew(){ 
        if (location.state) { 
            navigate('/addNewPassword', {state: location.state}); 
        } else { 
            console.error('Location.state não definida'); 
        } 
    }

    function renderPasswords(){
        if(location.state && location.state.passwords && location.state.passwords.length > 0){
            return location.state.passwords.map(password => {
                return(
                    <Item sx={{width: "25vw", display: "flex", flexDirection: "column", textAlign: "left"}} key={password.id} onClick={()=> handleClick(password.id)}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div>
                                <p>Nome: </p>
                            </div>
                            <div style={{marginLeft: "10px"}}>
                            <p>{password.title}</p>
                            </div>
                        </div>
                    </Item>
                )
            })
        }else if(location.state && location.state.passwords && location.state.passwords.length === 0){
            return(
                <Item sx={{width: "25vw", display: "flex", flexDirection: "column", textAlign: "left"}}>
                    <div>
                        Nenhum item encontrado
                    </div>
                </Item>
            )
        }
    }
    function navigateBack(){
        navigate(-1)
    }
    return (
        <>
            <Container>
                <Header />
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: 5}}>
                        <CategoryName>
                            <p>{location?.state?.categoria?.name}</p>
                        </CategoryName>
                    <Stack spacing={2} marginBottom={"16px"} useFlexGap>
                        {renderPasswords()}
                        <Box sx={{width: "25vw", display: "flex", textAlign: "center", justifyContent: "space-around"}}>
                            <Buttons onClick={()=> navigateBack()}>
                                <ArrowBack sx={{color: "#605e5a", fontSize: 40}}/> 
                            </Buttons>
                            <Buttons onClick={()=> addNew()} >
                                <AddCircle sx={{color: "#605e5a", fontSize: 40}} /> 
                            </Buttons>
                        </Box>
                    </Stack>
                </Box>    
            </Container>
            
        </>
    )
}

export default Passwords