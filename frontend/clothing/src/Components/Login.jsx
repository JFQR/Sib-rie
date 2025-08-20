import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
         
import axios from 'axios'

import OneImage from './ComplementComponents/OneImage'
import Navbar from './Navbar';
import Footer from './Footer';
import Content from './Content';

import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Login(){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        img: [],
    });
    
//will be true if the user wants to create an account
    const [ createAccount, setCreateAccount] = useState(false)
    
    const recieveImg = (file) => {
        setFormData((prevData) => ({
        ...prevData,
            img: [file],
        }));
    };

    const navigate = useNavigate()
//---------------control of the main functions
    const handleSubmit = (action, e) =>{
        console.log("action; ",action)
        action === "login"? handleLogin() :  handleCreate()

        e.preventDefault()
    }

    function to64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
            resolve(reader.result);
            };

            reader.onerror = (error) => {
            reject(error);
            };

            reader.readAsDataURL(file);
        });
    }
//----------------main functions of the form
    async function handleCreate() {

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);

        if (formData.img[0]) {
            formDataToSend.append('img', formData.img[0])
            const imgIn64 = await to64(formData.img[0])
            localStorage.setItem('ppicture',imgIn64)
        }

        try {
            await axios.post("http://localhost:8000/user/register/", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response=>{
                let userData = response.data
                
                localStorage.setItem("access", userData.access)
                localStorage.setItem("userId", userData.user.id)
                
                alert("Account created!")
                navigate("/")
                
            });
            //console.log(response.data);
        } catch (err) {
            alert(JSON.stringify(e.response?.data || err.message));
        }
    }


    function handleLogin(){

        let userExists = localStorage.getItem("access")
        
        if(userExists != null){
            //if they exist log them out:
            localStorage.clear()
        }

        let credentials = {
            email:formData.email,
            password:formData.password
        }

        axios.post ("http://localhost:8000/user/token/",credentials,{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            console.log(response.data)
            
            localStorage.setItem("access",response.data.access)
            localStorage.setItem("userId",response.data.id)
            localStorage.setItem("ppicture",response.data.img)            
            alert("You are logged")
            
            navigate("/")
        }).catch(error=>{
            alert("An error occurred")
            console.log(error)
        })
    }
    return(
        <>
            <Navbar/>
            <Content/>
            <div className='login-container'>
                <form onSubmit={handleSubmit} className='inside-container'>
                    {!createAccount && (<h2>Log in</h2>)}
                    {createAccount && (<h2>Create account</h2>)}

                    {createAccount &&(
                        <FloatLabel>
                            <InputText id="name" value={formData.name} required 
                                onChange={(e) => 
                                    setFormData((prevData)=>({...prevData, name: e.target.value}))} 
                            />
                            <label htmlFor="name">User name</label>
                        </FloatLabel>
                    )}

                    <FloatLabel>
                        <InputText id="email" value={formData.email} required type="email"
                            onChange={(e) => setFormData((prevData)=>({...prevData, email: e.target.value}))} 
                        />
                        <label htmlFor="email">Email</label>
                    </FloatLabel>

                    <Password 
                        value={formData.password} placeholder="Password" required toggleMask
                        onChange={(e) => setFormData((prevData)=>({...prevData, password: e.target.value}))} 
                    />
                       
                    {!createAccount &&(<Button label="Submit" onClick={()=>handleSubmit("login")} type="button"/>)}
                    {createAccount &&(<Button label="Create" onClick={()=>handleSubmit("create")} type="button"/>)}

                    {!createAccount && (<a onClick={()=>setCreateAccount(true)}>No account yet?</a>)}
                    {createAccount && (<a onClick={()=>setCreateAccount(false)}>I have an account</a>)}
                
                </form>
                {createAccount && (<OneImage sendImage={recieveImg}/>)}
            </div>
            <Footer/>
        </>

    )
}export default Login