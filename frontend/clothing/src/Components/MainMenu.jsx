import Navbar from "./Navbar"
import Content from "./Content"
import Footer from "./Footer"
import Chat from "./ComplementComponents/Chat"

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Dialog } from 'primereact/dialog';

import axios from 'axios'

function MainMenu(){

    const [products, setProducts] = useState()
    const [ yousold, setYouSold ] = useState(false)
    const [ seeChat, setSeeChat ] = useState(false)

    useEffect(()=>{
        axios.get("http://localhost:8000/product/products-list/").then(response=>{
            setProducts(response.data.results)
        })
        
        const token = localStorage.getItem("access")

        if(token){
            axios.get(`http://localhost:8000/money/sells-of-the-day/`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res.data.length !== 0){
                    setYouSold(true)
                }
            })
        }
    },[])

    return(
        <>
            <Navbar/>
            <Content/>

            <div className="main-menu-container">
                    {products?.length > 0 ? ( products?.map((product)=>{
                        return(
                            <Link to={`/buyproduct/${product.idproduct}`} className="card-container">
                                <div className="card-img-container">
                                    <img src={product.mainphoto} class="image-blur" />
                                    <img src={product.mainphoto} class="image-main" />
                                </div>
                                
                                <div className="img-card-description">
                                    <h3>{product.title}</h3>
                                    <h3>{product.price} - £</h3>
                                </div>
                            </Link>
                        )
                    })):(<p>No products available</p>)}

            </div>
            {seeChat && <Chat/>}
            <Dialog header="Congratulations!" visible={yousold} style={{ width: '50vw' }} onHide={() => {if (!yousold) return; setYouSold(false); }}>
                <p className="m-0">
                    You sold products today. Go to check your last sells on your profile.
                </p>
            </Dialog>
            
            <Footer/>
        </>

    )
}export default MainMenu