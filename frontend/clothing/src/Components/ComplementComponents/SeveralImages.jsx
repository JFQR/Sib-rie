import { useEffect, useRef, useState } from "react"
import axios from 'axios'

function SeveralImages({ImgsToSend, ImgsToRecieve}){

    //images taken from the file explorer
    const [ selectedImgs, setSelectedImgs ] = useState([])
    //images recieved from MyProduct.jsx
    const [ existingImgs, setExistingImgs ] = useState()
    useEffect(()=>{
        if(ImgsToRecieve){
            setExistingImgs(ImgsToRecieve)
        }
        
    },[ImgsToRecieve])

    function ver(){
        console.log(existingImgs)

    }

    function openExplorer() {
        fileInputRef.current.click()
    }
    function makeUrl(event) {
        const files = Array.from(event.target.files);
        const updatedImgs = [...selectedImgs, ...files];
        setSelectedImgs(updatedImgs);
        ImgsToSend(updatedImgs);
    }
    const fileInputRef = useRef(null) 

    async function deleteSelectedImg(imgName){
        await setSelectedImgs(prev => prev.filter(img => img.name !== imgName));
        console.log(selectedImgs)
    }
    async function deleteExistingImg(imgName,id){
        await setExistingImgs(prev => prev.filter(img => img.src !== imgName));
        console.log(existingImgs)
        
        axios.delete(`http://localhost:8000/product/delete/img/${id}/`).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.error(err)
        })
    }
    return(
        <div style={{display:"wrap", maxWidth:"300px"}}>
            <button onClick={ver}>ver</button>
            <input type="file" 
                accept=".jpg,.png,.jpeg"
                multiple
                id="fileInput" 
                ref={fileInputRef}
                style={{display: "none"}}
                onChange={makeUrl}
            />

            <button className="img-label-button" onClick={openExplorer}>Add images</button>

            {existingImgs && existingImgs.map((img, index)=>{
                let comesFromDataBase = img.src
                if(comesFromDataBase){
                    let newName = img.src.split("media/media/")[1]
                    
                    return(
                        <button 
                            className="img-label-button" 
                            id={`${img.src}`} 
                            onClick={()=>deleteExistingImg(`${img.src}`,img.id_imgProduct)}>
                                {newName}
                        </button>  
                    )
                }
            })}

            {selectedImgs && selectedImgs.map((img, index)=>{
                return(
                    
                    <button 
                        className="img-label-button" 
                        id={`img${index}`} 
                        onClick={()=>deleteSelectedImg(`img${img.name}`)}>
                            {img.name}
                    </button>
            
            )})}

        </div>
    )
}export default SeveralImages