//this is meant to let the user to manage their product
//individually

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Navbar from './Navbar'
import Content from './Content'
import Footer from './Footer'
import TagsDropdowns from './ComplementComponents/TagsDropdowns';
import SeveralImages from './ComplementComponents/SeveralImages';
import { Button } from 'primereact/button';



const schema = z.object({

    title: z
        .string().nonempty("You must fill this field.")
        .refine((val) => (val.match(/ /g) || []).length >= 1, {
            message: "It must have at least one blank spaces.",
    }),

    length: z
        .string().regex(/^\d+$/, "You must enter numbers only").min(1, "It must be at least 1 character long."
    ),
    width: z
        .string().regex(/^\d+$/, "You must enter numbers only" ).min(1, "It must be at least 1 character long."
    ),
    price: z
        
        .string().regex(/^\d+$/, "You must enter numbers only").nonempty(
        "remember to fill this field").min(1, "It must be at least 1 character long."

    ),
    desc: z
        .string()
        .nonempty("Remember to fill this field")
        .min(20, "It must be at least 20 characters long")
        .refine((val) => (val.match(/ /g) || []).length >= 2, {
            message: "It must have at least 2 blank spaces",
    }),
    availability: z
        .string().regex(/^\d+$/, "You must enter numbers only").min(1, "It must be at least 1 character long."
    ),

});

function MyProduct(){
    //to handle the form:
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "test@email.com",
        },
        resolver: zodResolver(schema),
    });
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv-IF THE USER WANTS TO UPDATE A PRODUCT:-vvvvvvvvvvvvvvvvvvvvvvvvvv
    const { idproduct } = useParams()
    const navigate = useNavigate()

    const [ extProduct, setExtProduct ] = useState()
    const [ extImgs, setExtImgs ] = useState()
    const [ extTags, setExtTags ] = useState()
    
    useEffect(()=>{
        if(idproduct){
            Promise.all([

            axios.get(`http://localhost:8000/product/product/${idproduct}/`),
            axios.get(`http://localhost:8000/product/images/${idproduct}`)

        ]).then(([productInfo, imgsProduct])=>{
            //The product already exists
            setExtProduct(productInfo.data)
            //The images already exist
            setImgs(imgsProduct.data.results)
            setImgs(prev => [...prev, {src: productInfo.data.mainphoto}]);
            //there are already tags
            let myTags={
                size:productInfo.data.size,
                colour:productInfo.data.colour,
                cms:productInfo.data.cms,
                subcategory:productInfo.data.subcategory,
            }
            setExtTags(myTags)

        }).catch(error =>{

            console.error("Error at retrieving data: ",error)
            alert("Error at retrieving the data of your product")
            navigate("/myaccount")

        })
        }
    },[])
    
async function urlToFile(url, filename, mimeType = 'image/png') {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
}

async function update() {
    let title = document.getElementById("title").value;
    let length = document.getElementById("length").value;
    let width = document.getElementById("width").value;
    let price = document.getElementById("price").value;
    let desc = document.getElementById("desc").value;
    let availability = document.getElementById("availability").value;
    let iduser = localStorage.getItem("userId");

    const formData = new FormData();

    formData.append('title', title);
    formData.append('length', length);
    formData.append('width', width);
    formData.append('price', price);
    formData.append('desc', desc);
    formData.append('availability', availability);
    formData.append('iduser', +iduser);

    Object.entries(tags).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            formData.append(key, value);
        }
    });

    if (imgs.length === 0) {
        alert("You must add images!");
        return;
    }

    // Convert to files, like the backend demands
    const convertedImgs = await Promise.all(
        imgs.map(async (img, index) => {
            if (img.src && typeof img.src === 'string' && !(img.src instanceof File)) {
                const file = await urlToFile(img.src, `image_${index}.png`);
                return { ...img, file };
            } else if (img instanceof File) {
                return { file: img }
            }
            return img;
        })
    );

    formData.append('mainphoto', convertedImgs[0].file);

    // Rearrange the images in the intended order:
    const last = convertedImgs.pop();
    convertedImgs.unshift(last);

    try {
        const response = await axios.put(
            `http://127.0.0.1:8000/product/update/product/${extProduct.idproduct}/`,
            formData
        );

        const idproduct = response.data.idproduct;

        for (let i = 0; i < convertedImgs.length - 1; i++) {
            const imgData = new FormData();
            imgData.append("id_product", idproduct);
            imgData.append("src", convertedImgs[i].file);

            if (convertedImgs[i].id_imgProduct) {
                null
            } else {
                await axios.post(
                    `http://127.0.0.1:8000/product/create/imgs/`,
                    imgData
                ).catch(err => {
                    console.error(err)
                    alert("An error occured while updating your images")
                })
            }
        }
        alert("Updated!")
    } catch (error) {
        console.log(error);
        alert("Error updating your product")
    }
}

    const onSubmit = async (data) => {

        const formData = new FormData();
        
        let iduser = localStorage.getItem("userId")
        
        formData.append('title', data.title);
        formData.append('length', data.length);
        formData.append('width', data.width);
        formData.append('price', data.price);
        formData.append('desc', data.desc);
        formData.append('availability', data.availability);
        formData.append('iduser', +iduser); 

        Object.entries(tags).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        if(imgs.length > 0){

            formData.append('mainphoto', imgs[0])
            console.log(formData)

        }else{

            alert("You must add images!")
            return

        }

        try {
            axios.post("http://127.0.0.1:8000/product/create/product/",formData).then(response=>{
                let idproduct = response.data.idproduct
                
                const imgData = new FormData()
//we start with i = 1 because we don't want the first image. It was already stored 
//in the product table as "mainphoto"
                for(let i = 1; i < imgs.length; i++){
                    
                    imgData.append("id_product",idproduct)
                    imgData.append("src",imgs[i])
                    
                    axios.post(`http://127.0.0.1:8000/product/create/imgs/`,imgData).then(response=>{
                        console.log(response)
                    })
                }
                alert("Product added!")
                navigate("/myaccount")
            })
        } catch (error) {
            console.log(error)
            alert("Error creating this product")
        } 

    };
//---------------------------------DELETE WORKFLOW---------------------------------------------//

    function destroy(){
        axios.delete(`http://localhost:8000/product/destroy/product/${extProduct.idproduct}/`).then(res => {
            console.log(res.data)
            alert("Product delete successfully")
            navigate("/")
        }).catch(err =>{
            console.error(err)
            alert("error at deleting your product ")
        })
    }
    const [ showGalleria, setShowGalleria ] = useState(false)
    const [ imgs, setImgs ] = useState()
    const [ tags, setTags ] = useState({
        subcategory:null,
        colour:null,
        size:null,
        cms:null,
        length:null,
        width:null,
    })

    function takeImgs(files){
        setImgs(files)
        console.log("imgs recieved in the parent: ",imgs)
    }

    function recieveTags(tags){
        setTags(prev => ({
            ...prev,
            ...tags
        }));
    }
    
    return(
        <>
            <Navbar/>
            <Content/>
            <div className="general-container">
                {idproduct && <h1>Update your product</h1>}
                {!idproduct && <h1>Add a product</h1>}
                
{/*the user wants to add tags, there are no tags yet */}
                {!extTags && (<TagsDropdowns sendTags={recieveTags}/>)}

{/*the user already added tags: */}
                {extTags && (<TagsDropdowns recieveTags = { extTags } />)}

                <form onSubmit={handleSubmit(onSubmit)}>

                    <input {...register('title')} id="title" defaultValue={extProduct?.title} placeholder='Title'/>
                    {errors.title && (
                        <div>{errors.title.message}</div>
                    )}

                    <input {...register('length')} id="length" defaultValue={extProduct?.length} placeholder='Length'/>
                    {errors.length && (
                        <div>{errors.length.message}</div>
                    )}
                    
                    <input {...register('width')} id="width" defaultValue={extProduct?.width} placeholder='Width'/>
                    {errors.width && (
                        <div>{errors.width.message}</div>
                    )}
                    
                    <input {...register('price')} id="price" defaultValue={extProduct?.price} placeholder='Price in £'/>
                    {errors.price && (
                        <div>{errors.price.message}</div>
                    )}
                    
                    <textarea {...register('desc')} id="desc" defaultValue={extProduct?.desc} placeholder='Description'></textarea> 
                    {errors.desc && (
                        <div>{errors.desc.message}</div>
                    )}
                    
                    <input {...register('availability')} id="availability" defaultValue={extProduct?.availability} placeholder='Availability'/> 
                    {errors.availability && (
                        <div>{errors.availability.message}</div>
                    )}
                    
                   {!extImgs &&
                        (<Button
                            disabled={isSubmitting}
                            label={isSubmitting ? "Loading..." : "Submit"}
                            type="submit"
                        />)    
                    }
                    
                </form>
                {extProduct && (<Button onClick={update} label="Update" />)}  
                {extProduct && (<Button onClick={destroy} label="Delete product" />)}   
                <SeveralImages
                    ImgsToSend={takeImgs}
                    ImgsToRecieve={imgs}
                />

            </div>
            <Footer/>
        </>

    )
}export default MyProduct