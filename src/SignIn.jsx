import { useUserData, saveUserDataInLocalStorage } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { styled as muiStyled } from "@mui/system";
import {API} from "./constant";
import Header from "./Header";
import {useState} from "react";
import  {ThreeDots}  from  'react-loader-spinner'
import { Container, Form } from "./assets/Styled";

const StyledTextField = muiStyled(TextField)({
  marginBottom: '16px',
});

function SignIn() {
  const [, setUserData] = useUserData();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let loadingAnimation = <ThreeDots color="#FFFFFF" height={45} width={60} />
  function sendForm(data) {
    setLoading(true);
    const request = axios.post(`${API}/signIn`, data);
    request.then((response) => {
      setUserData(response.data);
      saveUserDataInLocalStorage(response.data);
      setLoading(false);
      navigate("/homePage");
    });
    request.catch((error) => {
      alert(error.response.data);
    });
  }

  return (
    <Container>
      <Header />
      <Form onSubmit={handleSubmit(sendForm)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: "Email is required" }}
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
          rules={{ required: "Password is required", minLength: { value: 10, message: "Password must have at least 10 characters" } }}
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
        <Button type="submit" variant="contained" color="success">
          {loading ? loadingAnimation : 'ENTRAR'}
        </Button>
      </Form>
      <Link to="/signUp">
        Não tem conta? cadastre-se aqui
      </Link>
    </Container>
  );
}

export default SignIn;