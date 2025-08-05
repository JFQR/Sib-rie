import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import noPictureUser from "../assets/default-user.png"
import {useEffect, useState} from 'react'
function Navbar(){

    const [picture, setPicture] = useState()
    const [ existsUser, setExistsUser ] = useState()

    useEffect(()=>{
            let ppicture = localStorage.getItem('ppicture')
            setPicture(ppicture)
            let userId = localStorage.getItem('userId')
            setExistsUser(userId)
        },
    [])

    function ver(){
        alert(existsUser)
    }

    return(
        <main>
            
            <span><Link to="/">S I B É R I E</Link></span>
            <nav>
                <ul class="nav-links" id="navLinks">
                    <li><Link to="/" href="#">Home</Link></li>
                    <li><Link to="/searchbar"href="#">Search</Link></li>
                    <li><Link to="/aboutus" href="#">About us</Link></li>
                    <li><Link to="/login" href="#">Login</Link></li>
                    <li><Link to="/basket" href="#">Basket</Link></li>
                    {existsUser !==null && (<li><Link to = "/myproduct">Sell product</Link></li>)}
                </ul>
            </nav>
                {existsUser !== null &&(
                    <Link to="/myaccount" className="profile-circule">
                        {picture ?(
                            <Link to="/myaccount"><img src={picture}></img></Link>
                        ):(
                            <img src={noPictureUser}/>
                        )}
                    </Link>
                )}

        </main>
    )
}
export default Navbar