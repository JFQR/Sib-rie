import { useState, useRef, useEffect } from "react";

import { Button } from 'primereact/button';

export default function ManyImages({ ImgsToSend, ImgsToRecieve }){


    //------------CODE for UPDATE-------------------------------------------
    useEffect(()=>{
        if(ImgsToRecieve === undefined){
            null
        }else{
            console.log("recieved in children: ",ImgsToRecieve)
            setMyImgs(ImgsToRecieve)
            setImgs(true)
        }
    },[])

    //------------CODE TO UPDATE-------------------------------------------
    let srcs = []
    let imgs = []

    const [myImgs, setMyImgs] = useState([])
    const [Imgs, setImgs] = useState(false)
    const [selectedImages, setSelectedImages] = useState({});
    const [imgToUpdate, setImgToUpdate] = useState([])
    const [selectedDbImages, setSelectedDbImages] = useState({});


    const fileInputRef = useRef(null) 

    function openExplorer() {
        fileInputRef.current.click()
        setImgs(true)
    }

    function toParent(files){
        ImgsToSend(files)
    }

    function makeUrl(event){
        
        let files = event.target.files
        srcs.push(files)
        agregarImagen(files)
        toParent(files)
        console.log("mis files: ",srcs)
        setMyImgs(srcs[0])
        
        console.log("MIS IUMAGESNAED",myImgs)
        const contimgs = document.getElementById("img-container")
        const numChildren = contimgs.querySelectorAll("input")

        Array.from(files).forEach((file, index) => {

            let url = URL.createObjectURL(file);

            let input = document.createElement("input")
            input.className="input-img"
            input.type="checkbox"
            input.id=`myCheckbox${numChildren.length+index+1}`
            contimgs.appendChild(input)

            let lbl = document.createElement("label")
            lbl.className="checkbox-label"
            lbl.htmlFor=`myCheckbox${numChildren.length+index+1}`
            lbl.id="lbl-img"

            let image = document.createElement("img")
            image.id = `img${numChildren.length+index+1}`
            image.src=url
            image.addEventListener("click", () => toggleSelectImg(image.id)); 

            lbl.appendChild(image)
            contimgs.appendChild(lbl)
        }); 
        console.log("dewdwedw",myImgs)
        

    }

    const agregarImagen = (nuevaImagen) => {
        
        setImgToUpdate((prev) => [...prev, nuevaImagen]);
    
    };

    function deleteImgs(){

        const keysWithTrue = Object.entries(selectedImages)
        .filter(([key, value]) => value === true)
        .map(([key]) => {
            key
            imgs.push(key)
        });

        let allTheImgs = imgToUpdate[0]
        let arrayImgs = [...allTheImgs]

        let keys = Object.keys(selectedImages)

        for (let i = keys.length - 1; i >= 0; i--) {
            let positionToDelete = parseInt(keys[i].slice(3)) - 1;
            arrayImgs.splice(positionToDelete, 1);
        }
        ImgsToSend(arrayImgs)

        const uniqueArray = [...new Set(imgs)];

        uniqueArray.forEach(id => {
            let element = document.getElementById(id);
            if (element) {
                element.remove();
            }
        });
        
    }

    const toggleSelectImg = (id,imgId) => {

        console.log("selected",id)
        setSelectedImages((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        setSelectedDbImages((prev) => ({
            ...prev,
            [imgId]: !prev[imgId],
        }));
        

    };

    return(
        <div className="gerer-images">
            <div className="img-actions">
                <input type="file" 
                    accept=".jpg,.png,.jpeg"
                    multiple
                    id="fileInput" 
                    ref={fileInputRef}
                    style={{display: "none"}}
                    onChange={makeUrl}
                />

                <Button onClick={openExplorer}label = "Add images"/>
                <Button onClick={deleteImgs} label="Delete image"/>
            </div>
            {Imgs == true && (
                <div className="scroll-imgs">
                    <li className='list' id="img-container">
                        {Array.isArray(myImgs) && myImgs.length > 0 && myImgs.map((img, index) => (
                            <>
                                <img src={img.src}/>
                                {<><input id={`myCheckbox${index+1}`} className="input-img" type="checkbox"/>   
                                <label id="lbl-img" className="checkbox-label" htmlFor={`myCheckbox${index+1}`} />
                                    <img 
                                        onClick={()=>toggleSelectImg(`img${index+1}`,img.id)} 
                                        className={selectedImages[`img${index+1}`] ? 'checked' : 'not-checked'}
                                        id={`img${index+1}`} 
                                        src={img.src}
                                    >
                                    </img>
                                <label/></>}
                            </>
                        ))}
                    </li>
                </div>
            )}
        </div>
    )
}