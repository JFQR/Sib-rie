import Navbar from "./Navbar"
import Content from "./Content"
import Footer from "./Footer"
import QStepper from "./ComplementComponents/QStepper"
import { Dialog } from 'primereact/dialog';

import axios from 'axios'

import { useEffect, useState } from 'react'

import { Button } from 'primereact/button';

function Basket(){

    const [ myBasket, setMyBasket ] = useState()
    const [ noProducts, setNoProducts ] = useState(true)
    const [ requiredQuantity, setRequiredQuantity ] = useState()
    const [ visible, setVisible ] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8000/money/basket/",{
            withCredentials: true
        }).then(res=>{
            if(res.data.basket.length > 0 ){
                setNoProducts(false)
            }
            console.log(res.data.basket[0])
            setMyBasket(res.data.basket[0])
            setRequiredQuantity(1)
        }).catch(error =>{
            console.error(error)
            alert("We couldn't get your basket, we're sorry")
        })
    },[])

    function deleteArticle(){
        axios.delete(`http://localhost:8000/money/delete/article/${myBasket.id}/`,{
            withCredentials:true
        }).then(res =>{
            console.log(res.data)
            alert("Product deleted")
            location.reload();
        }).catch( error =>{
            console.log(error)
            alert("Error at deleting your product.")
        })
    }

    async function handlePurchase(){
        const token = localStorage.getItem("access")
        
        if(token == null){
            alert("You have to be logged!")
            return
        }

        let idUser = parseInt(myBasket.iduser)
        let customer = parseInt(localStorage.getItem("userId"))
        let total = requiredQuantity * myBasket.price
        let fullDate = new Date
        const dateOnly = fullDate.toLocaleDateString('en-CA');
        

        try{
            axios.post("http://localhost:8000/money/add/sell/",{
                product: +myBasket.id,
                total: total,
                date: dateOnly,
                id_user: idUser,
                customer: customer
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log("Purchase successful! ",response.data)
                
                setVisible(true)
                
                let newAvailability = myBasket.availability - requiredQuantity
                console.log("required: ",requiredQuantity,"newAvailability: ",newAvailability)
                Promise.all([
                    axios.patch(`http://localhost:8000/product/update/product/${myBasket.id}/`,{
                        availability : newAvailability
                    }),
                    axios.post(`http://localhost:8000/money/add/purchase/`,{
                        product: myBasket.id,
                        total: total,
                        date: dateOnly,
                        user: customer,
                    })
                ]).then(([resProduct,resPurchase])=>{
                    console.log(`updated product: ${resProduct}`)
                    console.log(`created purchase: ${resPurchase}`)

                }).catch(error=>{
                    console.log("error while patching or creating: ",error)
                })
            }).catch(error => {
                console.error("Error at registring the prurchase: ", error);
                alert("An error at registring the prurchase.")
            });
        }catch(error){
            console.log("error at sending the data to API: ",error)
            alert("Connection error, we're sorry")
        }

    }

    function deleteBasket(){
        axios.delete("http://localhost:8000/money/delete/basket/",{
            withCredentials: true
        }).then( res=>{
            console.log(res.data)
            alert("Basket deleted")
            location.reload();
        }).catch( error =>{
            console.log(error)
            alert("Error at deleting your basket.")
        })
    }

    return(
        <>
            <Navbar/>
            <Content/>

            <div className="general-container">

                {myBasket && (<>
                    <div className="product-basket-container">
                        <img class="bas-img" src={myBasket.mainphoto} width="250" />

                        <div className="info-product-basket">
                            <h2 class="bas-title">{myBasket.title}</h2>
                            <h2 class="bas-price">{myBasket.price} - £</h2>
                            <h2 class="bas-price">Available: {myBasket.availability}</h2>
                            <QStepper quantity={requiredQuantity} setQuantity={setRequiredQuantity} availability={myBasket.availability} />
                            {/*<MySlider class="bas-slider" maxQuantity={myBasket.availability} sendQuantity={recieveQuantity}/>*/}

                            <Button onClick={ handlePurchase } label="Buy!"/>
                            <Button label="Delete article" onClick={deleteArticle}/>
                        </div>
                        
                    </div>
                </>)}
                {!noProducts && <Button label="Delete basket" onClick={deleteBasket}/>}
                {noProducts && (
                    <>
                        <h1>
                            No products added yet
                        </h1>
                    </>
                )}

            </div> 
            <div className="card flex justify-content-center">
                <Dialog header="Instructions" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                    <p className="m-0">
                        Congratulations! Now the owner is going to talk to you or you can talk to them.
                        To chat with them, you just have to click on the section "Sold by", in their profile
                        you'll see a button to start the chat.
                    </p>
                </Dialog>
            </div>
            <Footer/> 
        </>

    )
}export default Basket