import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";

function AddNewPassword() {
    const {user} = useContext(UserContext);
    const location = useLocation()
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }
    function sendForm(data){
        const request = axios.post("http://localhost:5000/" + location.state.categoria.name.toLowerCase(),data, config);
        request.then((response) =>{
            navigate('/homePage')
        })
        request.catch((error) => {alert(error.response.data)})
    }

    function getfields(field){
        if(field.fieldType === "number"){
            if(location.state.categoria.name.toLowerCase() === "cards"){
                if(field.fieldName === "number"){
                    return  <>
                                <label>{field.label}</label>
                                <input
                                            type="text"
                                            id={field.fieldName}
                                            placeholder={field.fieldName}
                                            name={field.fieldName}
                                            className={errors?.[field.fieldName] && "input-error"}
                                            {...register(field.fieldName, {required: true, validate: (value)=> {
                                                let pattern = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
                                                return pattern.test(value)
                                            }})}
                                        >
                                </input>
                                {errors?.[field.fieldName]?.type === "required" && <p className="error-message"> {field.fieldName} é obrigatório</p>}
                                {errors?.[field.fieldName]?.type === "validate" && <p className="error-message"> {field.label} deve seguir o formato ####-####-####-####</p>}
                            </>
                }
                if(field.fieldName === "securityCode"){
                    return  <>
                                <label>{field.label}</label>
                                <input
                                            type="text"
                                            id={field.fieldName}
                                            placeholder={field.fieldName}
                                            name={field.fieldName}
                                            className={errors?.[field.fieldName] && "input-error"}
                                            {...register(field.fieldName, {required: true, minLength: 3, maxLength:3 ,validate: (value)=> {
                                                let pattern = /^\d+$/;
                                                return pattern.test(value)
                                            }})}
                                        >
                                </input>
                                {errors?.[field.fieldName]?.type === "required" && <p className="error-message"> {field.label} é obrigatório</p>}
                                {errors?.[field.fieldName]?.type === "validate" && <p className="error-message"> {field.label} deve conter apenas números</p>}
                                {errors?.[field.fieldName]?.type === "minLength" && <p className="error-message"> {field.label} deve conter 3 dígitos</p>}
                                {errors?.[field.fieldName]?.type === "maxLength" && <p className="error-message"> {field.label} deve conter 3 dígitos</p>}
                            </>
                }
            }
            if(location.state.categoria.name.toLowerCase() === "documents"){
                if(field.fieldName === "number"){
                    return  <> 
                                
                                    <label>{field.label}</label>
                                    <input
                                                type="text"
                                                id={field.fieldName}
                                                placeholder={field.fieldName}
                                                name={field.fieldName}
                                                className={errors?.[field.fieldName] && "input-error"}
                                                {...register(field.fieldName, {required: true})}
                                            >
                                    </input>
                                {errors?.[field.fieldName]?.type === "required" && <p className="error-message"> {field.label} é obrigatório</p>}
                            </>
                }
            }
        }

        if(field.fieldType === "select"){

            if(location.state.categoria.name.toLowerCase() === "cards"){
                if(field.fieldName === "type"){
                    return  <>
                                <label>{field.label}</label>
                                <select
                                    id={field.fieldName}
                                    name={field.fieldName}
                                    className={errors?.[field.fieldName] && "input-error"}
                                    {...register(field.fieldName, {required: true})}
                                >
                                    <option value = ""> Select type of card..</option>
                                    <option value = "credit"> Credit</option>
                                    <option value = "debit"> Debit</option>
                                    <option value = "both"> Both</option>
                                </select>
                                {errors?.[field.fieldName]?.type === "required" && <p className="error-message"> {field.label} é obrigatório</p>}
                            </>
                }
            }
            if(location.state.categoria.name.toLowerCase() === "documents"){
                if(field.fieldName === "type"){
                    return  <>
                                <label>{field.label}</label>
                                <select
                                    id={field.fieldName}
                                    name={field.fieldName}
                                    className={errors?.[field.fieldName] && "input-error"}
                                    {...register(field.fieldName, {required: true})}
                                >
                                    <option value = ""> Select type of document..</option>
                                    <option value = "RG"> RG</option>
                                    <option value = "CNH"> CNH</option>
                                </select>
                                {errors?.[field.fieldName]?.type === "required" && <p className="error-message"> {field.fieldName} é obrigatório</p>}
                            </>
                }
            }

        }

        if(field.fieldType === "checkbox"){
            return <>  
                    <label>{field.label}</label>
                    <input 
                        type={field.fieldType}
                        id={field.fieldName}
                        placeholder={field.fieldName}
                        name={field.fieldName}
                        {...register(field.fieldName)}
                    />
                </>
        }

        if(field.fieldType === "date"){
            if(location.state.categoria.name.toLowerCase() === "cards"){
                if(field.fieldName === "expireDate"){
                    return  <>
                                <label>{field.label}</label>
                                <input
                                            type="text"
                                            id={field.fieldName}
                                            placeholder={field.fieldName}
                                            name={field.fieldName}
                                            className={errors?.[field.fieldName] && "input-error"}
                                            {...register(field.fieldName, {required: true, validate: (value)=> {
                                                let pattern = /^[0-9]{2}\/[0-9]{2}$/;
                                                return pattern.test(value)
                                            }})}
                                        >
                                </input>
                                {errors?.[field.fieldName]?.type === "required" && <p className="error-message"> {field.fieldName} é obrigatório</p>}
                                {errors?.[field.fieldName]?.type === "validate" && <p className="error-message"> Data de Expiração deve ser no formato MM/AA</p>}
                            </>
                }
            }

            if(location.state.categoria.name.toLowerCase() === "documents"){
                return  <>
                            <label>{field.label}</label>
                            <input
                                        type="text"
                                        id={field.fieldName}
                                        placeholder={field.fieldName}
                                        name={field.fieldName}
                                        className={errors?.[field.fieldName] && "input-error"}
                                        {...register(field.fieldName, {required: true, validate: (value)=> {
                                            let pattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
                                            return pattern.test(value)
                                        }})}
                                    >
                            </input>
                            {errors?.[field.fieldName]?.type === "required" && <p className="error-message"> {field.label} é obrigatório</p>}
                            {errors?.[field.fieldName]?.type === "validate" && <p className="error-message"> {field.label} deve ser no formato DD/MM/AAAA</p>}
                        </>
            }
        }
        return  <>  
                    <label>{field.label}</label>
                    <input 
                        type={field.fieldType}
                        id={field.fieldName}
                        placeholder={field.fieldName}
                        name={field.fieldName}
                        className={errors?.[field.fieldName] && "input-error"}
                        {...register(field.fieldName, {required: true})}
                    />
                    {errors?.[field.fieldName]?.type === "required" && <p className="error-message"> {field.label} é obrigatório</p>}
                </>
    }
    return (
        <>

            <Container>
            <div className = "logo">
                PASSVAULT 🔏
            </div>
                <Form>
                    {location.state.categoria[location.state.categoria.name.toLowerCase()].map((field) => (    
                            getfields(field)
                    ))}
                    <button onClick={(e) => {
                        e.preventDefault()
                        handleSubmit(sendForm)()
                    }}>
                        CADASTRAR
                    </button>
                </Form>
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
`
const Form = styled.form `
  display: flex;
  flex-direction: column;
  margin: 0 2vw 0 2vw;
  align-items: center;

  input{
    width: 350px;
    margin: 0 2vw 0 2vw;
    }

  .campo{
    display:flex;
    flex-wrap: wrap;
  }
  
  button{
    margin-top: 10px;
    width: 350px;
  }

  select{
    width: 350px;
  }

  .input-error{
    outline: 1px solid rgb(255, 72, 72);
  }
  
  .error-message{
    color: rgb(255, 72, 72)
  }
`

export default AddNewPassword