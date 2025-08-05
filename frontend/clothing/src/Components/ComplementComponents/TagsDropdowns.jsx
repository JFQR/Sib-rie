import axios from 'axios'

import { useEffect, useState } from 'react'

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function TagsDropdowns({sendTags, recieveTags}){

    useEffect(()=>{
        if(recieveTags === undefined){
            console.log("not defined")
        }else{
            console.log("I'm in here")
            if(recieveTags.colour !==null){
                axios.get(`http://localhost:8000/product/colour/${recieveTags.colour}/`).then(res => {

                    setMyColours(res.data)
                }).catch(err =>{
                    console.log(err)
                    alert("An error occurred getting colours")
                })
            }

            if(recieveTags.cms !==null){
                axios.get(`http://localhost:8000/product/cm/${recieveTags.cms}/`).then(res => {

                    setMyCms(res.data)
                }).catch(err =>{
                    console.log(err)
                    alert("An error occurred getting the centimetres")
                })
            }
            if(recieveTags.subcategory == 3){
                axios.get(`http://localhost:8000/product/subcategory/${recieveTags.subcategory}/`).then(res => {

                    setUpperBody(res.data)
                }).catch(err =>{
                    console.log(err)
                    alert("An error occurred getting the subcategories")
                })
            }
            if(recieveTags.subcategory == 2){
                axios.get(`http://localhost:8000/product/subcategory/${recieveTags.subcategory}/`).then(res => {

                    setLowerBody(res.data)
                }).catch(err =>{
                    console.log(err)
                    alert("An error occurred getting the subcategories")
                })
            }
            if(recieveTags.subcategory == 1){
                axios.get(`http://localhost:8000/product/subcategory/${recieveTags.subcategory}/`).then(res => {

                    setShoes(res.data)
                }).catch(err =>{
                    console.log(err)
                    alert("An error occurred getting the subcategories")
                })
            }
            if(recieveTags.subcategory == 4){
                axios.get(`http://localhost:8000/product/subcategory/${recieveTags.subcategory}/`).then(res => {

                    setAccessories(res.data)

                }).catch(err =>{
                    console.log(err)
                    alert("An error occurred getting the subcategories")
                })
            }
        }
        Promise.all([
            axios.get("http://127.0.0.1:8000/product/subcategories/"),
            axios.get("http://localhost:8000/product/colours/"),
            axios.get("http://localhost:8000/product/cms/"),
        ]).then(([subcategories, colours, cms])=>{
            setSubcategories(subcategories.data.results)
            setColours(colours.data.results)
            setCms(cms.data.results)
        }).catch(err => {
            console.error(err)
            alert("An error occurred loading some tags")
        })
    },[])

    //this will only bring the cataglogues 
    const [ subcategories, setSubcategories ] = useState()
    const [ colours, setColours ] = useState()
    const [ cms, setCms ] = useState()

    //if we already have added tags to the product, we will store them in these states:
    const [ myColours, setMyColours ] = useState()
    const [ myCms, setMyCms ] = useState()
    
    const [ upperBody, setUpperBody ] = useState()
    const [ lowerBody, setLowerBody ] = useState()
    const [ accessories, setAccessories ] = useState()
    const [ shoes, setShoes ] = useState()

    const [showDialog, setShowDialog] = useState(false);

    function sendInfo(info){
        sendTags(info)
    }

    return(<div className="dropdowns">
        
        <select id="opciones" className="opciones">
            {upperBody && (<option onClick={()=>sendInfo({subcategory:upperBody[0].idsubcategory})}>{upperBody[0].name}</option>)}
            <option onClick={()=>sendInfo({subcategory:null})}>Upper body</option>
            <option onClick={()=>sendInfo({subcategory:null})}>None</option>

            {subcategories?.map((subcategory)=>{
                if(subcategory.fk_category == 3){
                    return(
                        <option onClick={()=>sendInfo({subcategory:subcategory.idsubcategory})} value="opcion1">{subcategory.name}</option>
                    )
                }
            })}

        </select>

        <select id="opciones" className="opciones">
            {lowerBody && (<option onClick={()=>sendInfo({subcategory:lowerBody[0].idsubcategory})}>{lowerBody[0].name}</option>)}
            <option onClick={()=>sendInfo({subcategory:null})}>Lower body</option>
            <option onClick={()=>sendInfo({subcategory:null})}>None</option>
            {subcategories?.map((subcategory)=>{
                if(subcategory.fk_category == 2){
                    return(
                        <option onClick={()=>sendInfo({subcategory:subcategory.idsubcategory})} 
                        value="opcion1">{subcategory.name}</option>
                    )
                }
            })}
        </select>

        <select id="opciones" className="opciones">
            {accessories && (<option onClick={()=>sendInfo({subcategory:accessories[0].idsubcategory})}>{accessories[0].name}</option>)}
            <option onClick={()=>sendInfo({subcategory:null})}>Accesories</option>
            <option onClick={()=>sendInfo({subcategory:null})}>None</option>
            {subcategories?.map((subcategory)=>{
                if(subcategory.fk_category == 4){
                    return(
                        <option onClick={()=>sendInfo({subcategory:subcategory.idsubcategory})} 
                        value="opcion1">{subcategory.name}</option>
                    )
                }
            })}
        </select>

        <select id="opciones" className="opciones">
            {shoes && (<option onClick={()=>sendInfo({subcategory:shoes[0].idsubcategory})}>{shoes[0].name}</option>)}
            <option onClick={()=>sendInfo({subcategory:null})}>Shoes</option>
            <option onClick={()=>sendInfo({subcategory:null})}>None</option>
            {subcategories?.map((subcategory)=>{
                if(subcategory.fk_category == 1){
                    return(
                        <option onClick={()=>sendInfo({subcategory:subcategory.idsubcategory})} 
                        value="opcion1">{subcategory.name}</option>
                    )
                }
            })}
        </select>
        
        <select id="opciones" className="opciones">
            {myColours && (<option onClick={()=>sendInfo({subcategory:myColours[0].idsubcategory})}>{myColours[0].name}</option>)}
            <option onClick={()=>sendInfo({colour:null})}>Colour</option>
            <option onClick={()=>sendInfo({colour:null})}>None</option>
            {colours?.map((colour)=>{
                return(
                    <option onClick={()=>sendInfo({colour:colour.idcolour})} 
                    value="opcion1">{colour.name}</option>
                )
            })}
        </select>

        <select id="opciones" className="opciones">
            {recieveTags?.size && (<option onClick={()=>sendInfo({size:recieveTags.size})}>{recieveTags.size}</option>)}
            <option onClick={()=>sendInfo({size:null})}>Size</option>
            <option onClick={()=>sendInfo({size:null})}>None</option>

            <option onClick={()=>sendInfo({size:"XS"})}>XS</option>
            <option onClick={()=>sendInfo({size:"S"})}>S</option>
            <option onClick={()=>sendInfo({size:"M"})}>M</option>
            <option onClick={()=>sendInfo({size:"L"})}>L</option>
            <option onClick={()=>sendInfo({size:"XL"})}>XL</option>
        </select>

        <select id="opciones" className="opciones">
            {myCms && (<option onClick={()=>sendInfo({cms:myCms.idcms})}>{myCms.length}</option>)}
            <option onClick={()=>sendInfo({cms:null})}>Cms</option>
            <option onClick={()=>sendInfo({cms:null})}>None</option>
            {cms?.map((cm)=>{
                return(
                    <option onClick={()=>sendInfo({cms:cm.idcms})}>{cm.length}</option>
                )
            })}
        </select>
        <Button label="?" onClick={() => setShowDialog(true)} />
        <Dialog header="About tags:" visible={showDialog} style={{ width: '50vw' }} onHide={() => {if (!showDialog) return; setShowDialog(false); }}>
            <p className="m-0">
                    It is not mandatory to add any tags, but that will defenitely help customers to find your product.
                    Cms is just for shoes.
            </p>
        </Dialog>
    </div>)
}export default  TagsDropdowns