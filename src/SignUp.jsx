import { Link } from "react-router-dom";
import axios from "axios";
import { useForm , Controller} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import {styled as muiStyled} from "@mui/system"
import {API} from "./constant";
import {useState} from "react";
import  {ThreeDots}  from  'react-loader-spinner'
import Header from "./Header";
import { Container, Form } from "./assets/Styled";

const StyledTextField = muiStyled(TextField)({
  marginBottom: '16px',
})
function SignUp() {
    const {control, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    let loadingAnimation = <ThreeDots color="#FFFFFF" height={45} width={60} />
    
    function sendForm(data){
        const request = axios.post(`${API}/signUp`, data);
        setLoading(true);
        request.then((response) => {
            setLoading(false);
            navigate("/signIn")
        })
        request.catch((error)=> {alert(error.response.data)})
    }
    return (
        <>
            <Container>
            <Header/>
                <Form>
                <Controller 
                  name="email" 
                  control={control} 
                  defaultValue="" 
                  rules={{required: "Email is required"}}
                  render={({ field }) => 
                    <StyledTextField 
                        {...field}
                        type="text" 
                        placeholder="E-mail"
                        label="E-mail"
                        variant="outlined" 
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                  }
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{required: "Password is required", minLength: {value:10, message: "Password must have at least 10 characters"}}}
                    render={({ field }) =>
                      <StyledTextField
                        {...field}
                        type="password"
                        placeholder="Senha"
                        label="Senha"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    }
                />
                <Button 
                  onClick = {(e) => 
                    {
                      e.preventDefault()
                      handleSubmit(sendForm)()
                    }
                  }
                  variant="contained"
                  color="success"
                >
                  {loading ? loadingAnimation : 'CADASTRAR'}
                </Button>

                </Form>
                <Link to="/signIn">
                Já possui conta? Logue-se aqui
                </Link>
            </Container>
        </>
    )
}

export default SignUp  