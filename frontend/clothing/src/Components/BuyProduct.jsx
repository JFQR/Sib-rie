import MyCarroussel from "./ComplementComponents/MyCarroussel"
import Navbar from './Navbar'
import Content from './Content'
import Footer from './Footer'
import QStepper from "./ComplementComponents/QStepper"
import { Dialog } from 'primereact/dialog';
        
import axios from 'axios'

import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams  } from 'react-router-dom';

import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { maxLength, omit } from "zod/v4-mini"
        
function BuyProduct(){
    
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const textareaRef = useRef();

    const [ rating, setRating ] = useState(null);
    const [ stock, setStock] = useState();
    const { idproduct } = useParams()
    const [ product, setProduct ] = useState()
    const [ colour, setColour ] = useState()
    const [ imgs, setImgs ] = useState()
    const [ visible, setVisible ] = useState(false)
    const [ myComment, setMyComment ] = useState()
    const [ comments, setComments ] = useState()

    function handleRating(myRating){

        setRating(myRating)

        axios.patch(`http://localhost:8000/product/update/product/${idproduct}/`,{
            score:myRating
        }).then(res =>
            {alert("Rating added")
            console.log("new rating: ",res.data.score)}

        ).catch(err => {
            console.error(err)
            alert("Couldn't set rating")
        })

    }

    function handleComment(){
        
        const commentData = new FormData()

        let content = textareaRef.current.value
        let user = localStorage.getItem("userId")
        let product = idproduct

        commentData.append("content", content)
        commentData.append("user",user)
        commentData.append("product",product)
        
        axios.post("http://localhost:8000/people/add/comment/",commentData).then(res =>{
            console.log(res.data)
            alert("Comment added")
        }).catch(err => {
            console.error(err)
            alert("Comment couldn't be added.")
        })

    }

    function handleDeleteComment(){

        axios.delete(`http://localhost:8000/people/delete/comment/${myComment.idcomment}/`).then(res=>{
            console.log(res.data)
            alert("Comment deleted")
            window.location.reload();
        }).catch(err => {
            console.error(err)
            alert("Error updating your comment")
        })
    
    }

    function handleUpdateComment(){

        let content = textareaRef.current.value
        
        axios.patch(`http://localhost:8000/people/update/comment/${myComment.idcomment}/`,{
            content:content
        }).then(res =>{
            console.log(res.data)
            alert("Comment updated")
        }).catch(err => {
            console.error(err)
            alert("Error updating your comment")
        })

    }

    async function handlePurchase(){
        
        let idUser = parseInt(product.iduser)
        let customer = parseInt(localStorage.getItem("userId"))
        let total = stock * product.price
        let fullDate = new Date
        const dateOnly = fullDate.toLocaleDateString('en-CA');
        const token = localStorage.getItem("access")

        try{
            axios.post("http://localhost:8000/money/add/sell/",{
                product: +idproduct,
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
                
                let newAvailability = product.availability - stock

                Promise.all([
                    axios.patch(`http://localhost:8000/product/update/product/${idproduct}/`,{
                        availability : newAvailability
                    }),
                    axios.post(`http://localhost:8000/money/add/purchase/`,{
                        product: +idproduct,
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

    function addToBasket(){

            axios.post(`http://localhost:8000/money/add/basket/${idproduct}/`, null,{
                withCredentials: true
            }).then(res => {
                console.log(res.data)
                alert("Product added to your basket")
            }).catch(error => {
                console.error(error)
                alert("Error at adding this product")
            })

    }

    useEffect(()=>{

        axios.get(`http://localhost:8000/product/product/${idproduct}`).then((response)=>{
            console.log(response)
            setProduct(response.data)
            setStock(response.data.availability)

            if(mode === null){
                axios.get(`http://localhost:8000/people/comments/${idproduct}/`).then(res=>{
                    setComments(res.data.results)
                }).catch(err => {
                    console.error(err)
                    alert("Error at getting comments for this post")
                })
            }
            
            let userId = localStorage.getItem("userId")
            if(mode == "rating"){
                axios.get(`http://127.0.0.1:8000/people/comment/${idproduct}/${userId}/`).then(res =>{
                    setMyComment(res.data.results[0])
                }).catch(err => {
                    console.error(err)
                    alert("Tried to fetch your comment but and error occured")
                })
            }

            if(response.data.score !== null){
                setRating(response.data.rating)
                let idcolour = response.data.colour
                axios.get(`http://localhost:8000/product/colour/${idcolour}`).then((response)=>{
                    setColour(response.data)
                }).catch(err => {
                    console.err(err)
                    alert("An error occurred getting the colour of the desired product")
                })
            }
            
            axios.get(`http://localhost:8000/product/images/${idproduct}/`).then((response)=>{
                setImgs(response.data)
            }).catch(err=> {
                console.error(err)
                alert("Error at retrieving the images.")
            })
        }).catch(err => {
            console.error(err)
            alert("An error occurred getting the product information")
        })
    },[])

    return(
        <>
            <Navbar/>
            <Content/>

            <div className="buy-product-container">

                    <div>
                        <h1>{product?.title}</h1>

                        {imgs && <MyCarroussel MyImgs={imgs.results}/>}
                    
                    </div>

                    <div className="info-buy-product">
                        <h2>{product?.price} - £</h2>

                        {mode == "norating" && product?.score !== null (
                            <Rating readOnly value={product?.score} />
                        )}

                        {mode == "rating" ? (<Rating value={product?.score} onChange={(e) => handleRating(e.value)} cancel={true} />):(<></>)}

                        {product?.colour === null ? (<></>) : (<h3>{colour?.name}</h3>)}
                        
                        <h3>Width: {product?.width}</h3>
                        
                        <h3>Length: {product?.length}</h3>
                        
                        {product?.cms === null ? (<></>) : (<h3>{product?.cms}</h3>)}
                        
                        <p>{product?.desc}</p>
                        
                        {product?.size === null ? (<h3>Size: Not added</h3>) : (<h3>size: {product?.size}</h3>)}

                        <p style={{margin:"0.5rem"}}>In stock: {product?.availability}</p>
                        
                        <QStepper quantity={stock} setQuantity={setStock} availability={product?.availability}/>
                        
                        <Button disabled={product?.availability < 1} onClick={ addToBasket } label="To basket"/>
                        <Button disabled={product?.availability < 1} onClick={ handlePurchase } label="Buy!"/>
                        
                    </div>

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

            {comments && (
                <div className="comments-container">
                    <h2>Comments</h2>
                    {comments.map((comment, index) => (
                    <p key={index}>► {comment.content}</p>
                    ))}
                </div>
            )}

            {mode == "rating" && !myComment && (<div className="comments-container" >
                <textarea 
                    ref={textareaRef} 
                    id="comment-content" 
                    placeholder="Leave a comment here."
                >
                </textarea>
                <Button label="Submit comment" onClick={handleComment}/>
            </div>)}

            {myComment && (<div className="comments-container">
                <textarea 
                    ref={textareaRef} 
                    id="comment-content" 
                    placeholder="Leave a comment here."
                    defaultValue={myComment.content}
                >
                </textarea>

                <Button label="Delete comment" severity="danger" onClick={handleDeleteComment}/>
                <Button label="Update comment" onClick={handleUpdateComment}/>
            </div>)}
            <Footer/>
        </>
    )
}export default BuyProduct