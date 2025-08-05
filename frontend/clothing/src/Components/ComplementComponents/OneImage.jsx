/*this component was made to take choose one image from the computer*/
import { useState } from "react";
import { Button } from 'primereact/button';

function OneImage({sendImage}){

    const [dltPicture, setDltPicture] = useState(false)

    function openExplorer() {
        document.getElementById("fileInput").click(); 
    }

    async function makeUrl(event){
        
        document.getElementById("img-adder").disabled = true
        let file = event.target.files[0]
        await sendPpicure(file)
        let url = URL.createObjectURL(file);
        let img = document.getElementById("preview")
        img.src = url
        
        setDltPicture(true)

    }
    
    function sendPpicure(image){
        sendImage(image)
    }

    function anotherImage(){
        let img = document.getElementById("preview")
        img.src=""
        openExplorer()
    }
//if the user doesn't want to use an image at the end
//they can delete it anyway
    function deleteImg(){
        let img = document.getElementById("preview")
        img.src=""
        document.getElementById("img-adder").disabled = false
    }

    return(
        <div className="one-image-container">
            <input type="file" 
                accept=".jpg,.png,.jpeg"
                multiple={false}
                id="fileInput" 
                style={{display: "none"}}
                onChange={makeUrl}
            />

            <Button type="button" label="Choose a pic (optional)"id="img-adder" onClick={openExplorer}/>

            <div id="place" className="img-placer">
                <img id="preview" />
            </div>
            
            {dltPicture && 
                (<>
                    <Button type="button" label="Choose a different image" onClick={anotherImage}/>
                    <Button type="button" label="Delete image" onClick={deleteImg}/>
                </>)}     
        </div>
    )
}export default OneImage