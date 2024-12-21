import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
function AddNewPassword() {
    const [formData, setFormData] = useState({});
    const {user} = useContext(UserContext);
    const location = useLocation()
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }
    function sendForm(){
        const request = axios.post("http://localhost:5000/" + location.state.name.toLowerCase(),formData, config);
        request.then((response) =>{
            setFormData({})
            navigate('/passwords', {state:location.state})
        })
        request.catch((error) => {alert(error.response.data)})
    }

    return (
        <>

            <div>
                <form onSubmit={(e) => 
                {
                    e.preventDefault()
                    sendForm()
                }
                }>
                    {location.state[location.state.name.toLowerCase()].map((field) => (
                        <div key={field}>
                            <input id={field} name={field}type="text" placeholder={field} value ={formData[field] || ''} onChange={(e)=> setFormData({...formData,[e.target.name]: e.target.value})} required/>
                        </div>
                    ))}
                    <button type="submit">Enviar</button>
                </form>
            </div>
            
        </>
    )
}

export default AddNewPassword