
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import Navbar from "./Navbar"
import Content from "./Content"
import Footer from "./Footer"
import OneImage from './ComplementComponents/OneImage'
import Chat from "./ComplementComponents/Chat"

import axios from "axios"

import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';


function MyAccount(){

    const navigate = useNavigate();

    const [ iveSold, setIveSold ] = useState()
    const [ onStock, setOnStock ] = useState()
    const [ iveBought, setIveBought ] = useState()
    //emails are people who bought, sellerEmails are people who sold products to the account
    const [ emails, setEmails] = useState([])
    const [ sellerEmails, setSellerEmails] = useState([])

    const [ seeChat, setSeeChat ] = useState(false)
    const [ requiredInfo, setRequiredInfo ] = useState()
    //const [ checked, setChecked ] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        password:'',
        img: [],
    });

    const recieveImg = (file) => {
        setFormData((prevData) => ({
        ...prevData,
            img: [file],
        }));
    };

    useEffect(()=>{

            Promise.all([

                axios.get(`http://localhost:8000/money/sells-user/${userId}/`),
                axios.get(`http://localhost:8000/product/myproducts/${userId}/`),
                axios.get(`http://localhost:8000/money/purchase-user/${userId}/`),

            ]).then(([sells,myProducts,boughts])=>{

                setOnStock(myProducts.data)
                setIveSold(sells.data)
                setIveBought(boughts.data)

                //if we have sells we need to contact the person who bought, 
                // so we are retrieving their email:
                if(sells.data.length !== 0 ){
                    
                    let mySells = sells.data
                    
                    mySells.forEach( sell => {

                        axios.get(`http://localhost:8000/user/user/${sell.old_customer}/`).then(res =>{
                            setEmails(prev => [...prev, res.data.email])
                        }).catch(err => {
                            console.error(err)
                        })
                    });

                }
                //if we've bought something we need to contact the person who sold us, 
                // so we are retrieving their email:
                if(boughts.data.length !== 0 ){
                    
                    let myPurchases = boughts.data
                    
                    myPurchases.forEach( bought => {

                        axios.get(`http://localhost:8000/user/user/${bought.old_id_user}/`).then(res =>{
                            setSellerEmails(prev => [...prev, res.data.email])
                        }).catch(err => {
                            console.error(err)
                        })
                    });

                }
            }).catch(error=>{
                console.error("error at retrieving data: ",error)
                alert("An error occured aat retrieving your data.")
            })
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        if (formData.img) {
            formDataToSend.append('img', formData.img);
        }

        try {
            const token = localStorage.getItem('access');
            const response = await axios.put("http://localhost:8000/user/update/", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            localStorage.setItem('name', response.data.name);

        } catch (err) {
            alert(JSON.stringify(err.response?.data || err.message));
        }
    };

    function handleLogout(){
        localStorage.clear()
        navigate("/")
    }

    function startChat(email, customerId, userId){
        
        setRequiredInfo({email:email, customerId:customerId, userId:userId})
        setSeeChat(true)
    }

    function updateStatus(event, id){

        axios.patch(`http://localhost:8000/money/update/sell/${id}/`,
            {status:event}
        ).then(res =>
            {   
                console.log(res.data)
                alert("Updated!")
            }
        ).catch(error => {
            console.error(error)
            alert("Failed to update status!")
        })
    }
    function closeChat(){
        setSeeChat(false)
    }

    return(
        <>  
            <Navbar/>
            <Content/>

            <div className="general-container">
                <h1>Update my info.</h1>

                <form onSubmit={handleSubmit}>
                    <FloatLabel>
                        <InputText id="name" type="text" required value={formData.name} 
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <label htmlFor="name">Name</label>
                    </FloatLabel>

                    <Password value={formData.password} required placeholder="Password" 
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} toggleMask />
                    <OneImage sendImage={recieveImg}/>
                    
                    <Button label="Update" type="submit"/>
                    
                    <div className="buttons-container">
                        <Button label="Delete account" type="button"/>
                        <Button label="Logout" onClick={handleLogout} type="button"/>
                        <Button label="Sell a product" onClick={()=>navigate("/myproduct")} type="button"/>
                    </div>

                </form>

                <h1>My products on sale</h1>

                <div className="my-products-container">
                    {onStock?.length  > 0  ? (onStock?.map((myproduct)=>{return(
                        <>
                            <Link to = {`/myproduct/${myproduct.idproduct}`}>
                             ► {myproduct.title}
                               <br/> 
                             - availability: {myproduct.availability}
                            </Link>              
                        </>
                    )})):<p>No products on sale</p>}
                </div>


                <h1>What I've bought</h1>

                <div className="my-products-container">
                    {iveBought?.length > 0 ? (iveBought?.map((bought,index)=>{return(<div className="sold-container">
                        <Link to={`/buyproduct/${bought.product.idproduct}?mode=${bought.status ? "rating" : "norating"}`}>
                        ► {bought.product.title}
                        </Link>
                        <h3 
                            style={{cursor:"pointer"}} 
                            onClick={ ()=> startChat(sellerEmails[index], bought.old_customer, bought.old_id_user) }
                        >contact with: {sellerEmails[index]}
                        </h3>
                    </div>)})):<p>No products bought</p>}
                </div>


                <h1>What I've sold</h1>

                <div className="my-products-container">
                    {iveSold?.length > 0 ? (iveSold?.map((sold, index)=>{return(
                        <div className="sold-container">
                            
                            <Link to = {`/myproduct/${sold.product.idproduct}`}>
                                ► {sold.product.title}
                            </Link>

                            <h3 
                                style={{cursor:"pointer"}} 
                                onClick={ ()=> startChat(emails[index], sold.old_customer, sold.old_id_user) }
                            >contact with: {emails[index]}
                            </h3>

                            {sold.status == true ? (
                                <>
                                    <label for = {`product${sold.product.idproduct}`}>
                                            Delivered and payed?
                                    </label>

                                    <input onChange = {e => updateStatus(e.target.checked, sold.idsell)} 
                                        type = "checkbox" 
                                        name = {`product${sold.idsell}`}
                                        checked
                                    />   
                                </>
                                ):(
                                <>
                                    <label for = {`product${sold.product.idproduct}`}>Delivered and payed?</label>
                                    <input onChange = {e => updateStatus(e.target.checked, sold.idsell)} 
                                        type = "checkbox" 
                                        name = {`product${sold.idsell}`}
                                    /> 
                                </>)
                            }

                        </div>
                    )})):<p>No products sold</p>}
                </div>
            </div>
            {seeChat && <Chat usersInfo={requiredInfo} closeSignal={closeChat}/>}
            <Footer/>
        </>

    )
}export default MyAccount