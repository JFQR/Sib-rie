import Navbar from "./Navbar"
import Content from "./Content"
import Footer from "./Footer"

function AboutUs(){
    return(
        <>
            <Navbar/>
            <Content/>
            <div style={{textAlign:"center"}}className="general-container">
                <h1>Hi, we're Sibérie</h1>
                <p>
                    We're a company who promotes circular economy by bringing a space where people can offer their already used clothes
                    to other people in a safe space for anyone
                </p>
                <h2>What are we planning for the future?</h2>
                <p>
                    We are also planning to exapnd our website to offer the possibility to offer fabric of already used clothes,
                    so that we will be able to cover another key point of circular economy, naimly, recicling materials of other 
                    clothes.
                </p>
            </div>
            <Footer/>
        </>

    )
}export default AboutUs