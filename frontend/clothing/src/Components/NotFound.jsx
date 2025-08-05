import { useNavigate } from "react-router-dom"
import { Button } from 'primereact/button';

function NotFound(){
   
    navigate = useNavigate()

    return(<div className="general-container">
        
        <h1>Page not found.</h1>
        
        <Button label="Go back" onClick={()=>navigate("/")}/>
    </div>)
}export default NotFound
