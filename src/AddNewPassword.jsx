import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useUserData } from "./UserContext";
import {API} from "./constant";
import {styled as muiStyled, width} from "@mui/system"
import { Button, MenuItem, TextField, Select, InputLabel, FormHelperText, Checkbox, FormControlLabel } from "@mui/material";
import Header from "./Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Form } from "./assets/Styled";
const StyledTextField = muiStyled(TextField)({
    marginBottom: '16px',
  })
const StyledSelect = muiStyled(Select)({
    marginBottom: '16px',
})

function AddNewPassword() {
    const [userData] = useUserData();
    const location = useLocation()
    const navigate = useNavigate();
    const {control, register, handleSubmit, formState: {errors}} = useForm();
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }

    function sendForm(data){
        const request = axios.post(`${API}/${location?.state?.categoria?.name.toLowerCase()}`, data, config);
        request.then((response) =>{
            navigate('/homePage')
        })
        request.catch((error) => {alert(error.response.data)})
    }

    function getfields(field, index){
        let campo = field;
        if(field.fieldType === "number"){
            if(location?.state?.categoria?.name.toLowerCase() === "cards"){
                if(field.fieldName === "number"){
                    return  <>
                                <Controller
                                    key={index}
                                    name={campo.fieldName}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: `${campo.label} is required`, validate: {pattern: value => /^\d+$/.test(value) || 'Card number must be numeric', length: value => value.length === 16 || 'Card number must have exactly 16 digits'}}}
                                    render={({ field }) =>
                                        <StyledTextField
                                            {...field}
                                            type="text"
                                            placeholder={campo.label}
                                            label={campo.label}
                                            variant="outlined"
                                            error={!!errors[campo.fieldName]}
                                            helperText={errors[campo.fieldName]?.message}
                                        />
                                    }
                                />
                            </>
                }
                if(field.fieldName === "securityCode"){
                    return  <>
                                <Controller
                                    key={index}
                                    name={campo.label}
                                    control={control}
                                    defaultValue=""
                                    rules={{ 
                                        required: `${campo.label} é obrigatório`, 
                                        validate: { pattern: value => /^\d+$/.test(value) || 'Security code must be numeric' ,
                                                    length: value => value.length === 3 || 'Security code must have exactly 3 digits'}}}
                                    render={({ field }) =>
                                        <StyledTextField
                                            {...field}
                                            type="text"
                                            placeholder={campo.label}
                                            label={campo.label}
                                            variant="outlined"
                                            error={!!errors[campo.label]}
                                            helperText={errors[campo.label]?.message}
                                        />
                                    }
                                />
                            </>
                }
            }
            if(location.state.categoria.name.toLowerCase() === "documents"){
                if(field.fieldName === "number"){
                    return  <> 
                                <Controller
                                    key={index}
                                    name={campo.fieldName}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: `${campo.label} is required`, validate: {pattern: value => /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value) || `${campo.label} deve ser no formato DD/MM/AAAA`}}}

                                    render={({ field }) =>
                                        <StyledTextField
                                            {...field}
                                            type="text"
                                            placeholder={campo.label}
                                            label={campo.label}
                                            variant="outlined"
                                            error={!!errors[campo.label]}
                                            helperText={errors[campo.label]?.message}
                                        />
                                    }
                                />
                            </>
                }
            }
        }

        if(field.fieldType === "select"){

            if(location?.state?.categoria?.name.toLowerCase() === "cards"){
                if(field.fieldName === "type"){
                    return  <>
                                <Controller
                                    key={index}
                                    name={campo.fieldName}
                                    control={control}
                                    defaultValue=""
                                    rules={{required: `${campo.label} is required`}}
                                    render={({ field }) =>
                                        <>
                                        <InputLabel variant="standard" id={`select-label-${index}`}>{campo.label}</InputLabel>
                                        <StyledSelect
                                            {...field}
                                            type={campo.fieldType}
                                            id={`select-${index}`}
                                            labelId={`select-label-${index}`}
                                            label={campo.label}
                                            variant="outlined"
                                            error={!!errors[campo.fieldName]}
                                            helperText={errors[campo.fieldName]?.message}
                                            sx={{width: "440px"}}

                                        >
                                            <MenuItem value = "credit"> Credit</MenuItem>
                                            <MenuItem value = "debit"> Debit</MenuItem>
                                            <MenuItem value = "both"> Both</MenuItem>
                                        </StyledSelect>
                                        {errors[campo.label] && (
                                            <FormHelperText error>{errors[campo.fieldName]?.message}</FormHelperText>
                                        )}
                                        </>
                                    }
                                />
                            </>
                }
            }
            if(location.state.categoria.name.toLowerCase() === "documents"){
                if(field.fieldName === "type"){
                    return  <>
                            <Controller
                                    key={index}
                                    name={campo.fieldName}
                                    control={control}
                                    defaultValue=""
                                    rules={{required: `${campo.label} is required`}}
                                    render={({ field }) =>
                                        <>
                                        <InputLabel variant="standard" id={`select-label-${index}`}>{campo.label}</InputLabel>
                                        <StyledSelect
                                            {...field}
                                            type={campo.fieldType}
                                            id={`select-${index}`}
                                            labelId={`select-label-${index}`}
                                            label={campo.label}
                                            variant="outlined"
                                            error={!!errors[campo.fieldName]}
                                            helperText={errors[campo.fieldName]?.message}
                                            sx={{width: "440px"}}

                                        >
                                            <MenuItem value = "RG"> RG</MenuItem>
                                            <MenuItem value = "CNH"> CNH</MenuItem>
                                        </StyledSelect>
                                        {errors[campo.label] && (
                                            <FormHelperText error>{errors[campo.fieldName]?.message}</FormHelperText>
                                        )}
                                        </>
                                    }
                                />
                            </>
                }
            }

        }

        if(field.fieldType === "checkbox"){
            return <>  
                    
                    <FormControlLabel 
                        control={
                            <Controller
                                key={index}
                                name={campo.fieldName}
                                control={control}
                                defaultValue={false}
                                rules={{required: `${campo.label} is required`}}
                                render={({ field }) =>
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                    />
                                }
                            />
                        } 
                        label={campo.label} 
                    />
                </>
        }

        if(field.fieldType === "date"){
            if(location.state.categoria.name.toLowerCase() === "cards"){
                if(field.fieldName === "expireDate"){
                    return  <>
                                <Controller
                                    key={index}
                                    name={campo.fieldName}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: `${campo.label} is required`, validate: {pattern: value => /^[0-9]{2}\/[0-9]{2}$/.test(value) || 'Data de Expiração deve ser no formato MM/AA'}}}

                                    render={({ field }) =>
                                        <StyledTextField
                                            {...field}
                                            type="text"
                                            placeholder={campo.label}
                                            label={campo.label}
                                            variant="outlined"
                                            error={!!errors[campo.fieldName]}
                                            helperText={errors[campo.fieldName]?.message}
                                        />
                                    }
                                />
                            </>
                }
            }

            if(location.state.categoria.name.toLowerCase() === "documents"){
                return  <>
                            <Controller
                                    key={index}
                                    name={campo.fieldName}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: `${campo.label} is required`, validate: {pattern: value => /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value) || `${campo.label} deve ser no formato DD/MM/AAAA`}}}

                                    render={({ field }) =>
                                        <StyledTextField
                                            {...field}
                                            type="text"
                                            placeholder={campo.label}
                                            label={campo.label}
                                            variant="outlined"
                                            error={!!errors[campo.fieldName]}
                                            helperText={errors[campo.fieldName]?.message}
                                        />
                                    }
                                />
                        </>
            }
        }
        return  <>  
                    <Controller
                        key={index}
                        name={campo.fieldName}
                        control={control}
                        defaultValue=""
                        rules={{required: `${campo.label} is required`}}
                        render={({ field }) =>
                            <StyledTextField
                                {...field}
                                type={campo.fieldType}
                                placeholder={campo.label}
                                label={campo.label}
                                variant="outlined"
                                error={!!errors[campo.fieldName]}
                                helperText={errors[campo.fieldName]?.message}
                            />
                        }
                    />
                </>

                
    }
    return (
        <>
            
            <Container>
            <Header />
                <Form onSubmit={handleSubmit(sendForm)}> 
                    {location?.state?.categoria[location.state.categoria.name.toLowerCase()].map((field, index) => (    
                            getfields(field, index)
                    ))}
                    <Button type="submit" variant="contained" color="success">
                        CADASTRAR
                    </Button>
                </Form>
                <Button variant="contained" color="error" onClick={()=> navigate(-1)} sx={{width: "350px", marginTop: "10px"}}>
                    <ArrowBackIcon/> VOLTAR
                </Button>
            </Container>
            
        </>
    )
}

export default AddNewPassword