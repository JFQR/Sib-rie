import { Link } from 'react-router-dom'

import Navbar from './Navbar';
import Content from './Content';
import Footer from './Footer';

import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

function SearchBar(){
    
    const {subcategory} = useParams()
    useEffect(()=>{
        if (subcategory) {
            Promise.all([
                axios.get(`http://127.0.0.1:8000/product/search/title/?q=${subcategory}`),
                axios.get(`http://127.0.0.1:8000/product/search/colour/?q=${subcategory}`),
                axios.get(`http://127.0.0.1:8000/product/search/width/?q=${+subcategory}`),
                axios.get(`http://127.0.0.1:8000/product/search/length/?q=${+subcategory}`),
                axios.get(`http://127.0.0.1:8000/product/search/cms/?q=${+subcategory}`),
                axios.get(`http://127.0.0.1:8000/product/search/price/?q=${+subcategory}`),
                axios.get(`http://127.0.0.1:8000/product/search/size/?q=${+subcategory}`),
            ]).then(([title,colour,width,length,cms,price,size])=>{
                setResults({
                    title: title.data.posts,
                    colour: colour.data.posts,
                    width: width.data.posts,
                    length: length.data.posts,
                    cms: cms.data.posts,
                    price: price.data.posts,
                    size: size.data.posts
                });
                setShowResults(true)
            }).catch(err => {
                console.error(err)
                alert("Error at retriving related products")
            })
        }
    },[subcategory])

    //this just shows or hides the query results
    const [showResults, setShowResults] = useState(false)
    const [search, setSearch] = useState()
    //this stores the query results
    const [results, setResults] = useState({
        title:null,
        colour:null,
        width:null,
        length:null,
        cms:null,
        price:null,
        size:null
    })
    const [value, setValue] = useState()

    const pressEnter = (event) => {
        if (event.key === "Enter") {
            Promise.all([
                axios.get(`http://127.0.0.1:8000/product/search/title/?q=${value}`),
                axios.get(`http://127.0.0.1:8000/product/search/colour/?q=${value}`),
                axios.get(`http://127.0.0.1:8000/product/search/width/?q=${+value}`),
                axios.get(`http://127.0.0.1:8000/product/search/length/?q=${+value}`),
                axios.get(`http://127.0.0.1:8000/product/search/cms/?q=${+value}`),
                axios.get(`http://127.0.0.1:8000/product/search/price/?q=${+value}`),
                axios.get(`http://127.0.0.1:8000/product/search/size/?q=${+value}`),
            ]).then(([title,colour,width,length,cms,price,size])=>{
                setResults({
                    title: title.data.posts,
                    colour: colour.data.posts,
                    width: width.data.posts,
                    length: length.data.posts,
                    cms: cms.data.posts,
                    price: price.data.posts,
                    size: size.data.posts
                });
                setShowResults(true)
            }).catch(err => {
                console.error(err)
                alert("Error at retriving related products")
            })
        }
    }

        return(
        <>   
            <Navbar/>
            <Content/>

            <div className='general-container'>

                <FloatLabel>
                    <InputText id="username" value={search} onChange={(e) => setValue(e.target.value)} onKeyDown={pressEnter}/>
                    <label htmlFor="username">Look for clothes</label>
                </FloatLabel>
                {!showResults && (<h1>Look for clothes</h1>)}

                {showResults && (
                    <div className="main-menu-container">

                        {results.cms.length == 0 &&
                        results.colour.length == 0 &&
                        results.length.length == 0 &&
                        results.price.length == 0 &&
                        results.size.length == 0 &&
                        results.title.length == 0 &&
                        results.width.length == 0 && (
                            <h1>No related products</h1>
                        )}
                        
                        {results.cms != null && results.cms.map((mycms)=>{return(
                            <div className="card-container">
                                <Link className="card-container" to = {`/buyproduct/${mycms.idproduct}`}>
                                    <div className="card-img-container">
                                        <img src={mycms.mainphoto}  class="image-blur" />
                                        <img src={mycms.mainphoto} class="image-main" />
                                    </div>
                                </Link>
                                    
                                <div className="img-card-description">
                                    <h3>{mycms.title}</h3>
                                    <h3>{mycms.price} - €</h3>
                                </div>
                            </div>
                        )})}

                        {results.colour != null && results.colour.map((mycolour)=>{return(
                            <div className="card-container">
                                <Link className="card-container" to = {`/buyproduct/${mycolour.idproduct}`}>
                                    <div className="card-img-container">
                                        <img src={mycolour.mainphoto}  class="image-blur" />
                                        <img src={mycolour.mainphoto} class="image-main" />
                                    </div>
                                </Link>
                                    
                                <div className="img-card-description">
                                    <h3>{mycolour.title}</h3>
                                    <h3>{mycolour.price} - €</h3>
                                </div>
                            </div>
                        )})}

                        {results.length != null && results.length.map((mylength)=>{return(
                            <div className="card-container">
                                <Link className="card-container" to = {`/buyproduct/${mylength.idproduct}`}>
                                    <div className="card-img-container">
                                        <img src={mylength.mainphoto}  class="image-blur" />
                                        <img src={mylength.mainphoto} class="image-main" />
                                    </div>
                                </Link>
                                    
                                <div className="img-card-description">
                                    <h3>{mylength.title}</h3>
                                    <h3>{mylength.price} - €</h3>
                                </div>
                            </div>
                        )})}

                        {results.price != null && results.price.map((myprice)=>{return(
                            <div className="card-container">
                                <Link className="card-container" to = {`/buyproduct/${myprice.idproduct}`}>
                                    <div className="card-img-container">
                                        <img src={myprice.mainphoto}  class="image-blur" />
                                        <img src={myprice.mainphoto} class="image-main" />
                                    </div>
                                </Link>
                                    
                                <div className="img-card-description">
                                    <h3>{myprice.title}</h3>
                                    <h3>{myprice.price} - €</h3>
                                </div>
                            </div>
                        )})}

                        {results.size != null && results.size.map((mysize)=>{return(
                            <div className="card-container">
                                <Link className="card-container" to = {`/buyproduct/${mysize.idproduct}`}>
                                    <div className="card-img-container">
                                        <img src={mysize.mainphoto}  class="image-blur" />
                                        <img src={mysize.mainphoto} class="image-main" />
                                    </div>
                                </Link>
                                    
                                <div className="img-card-description">
                                    <h3>{mysize.title}</h3>
                                    <h3>{mysize.price} - €</h3>
                                </div>
                            </div>
                        )})}

                        {results.title != null && results.title.map((mytitle)=>{return(
                            <div className="card-container">
                                <Link className="card-container" to = {`/buyproduct/${mytitle.idproduct}`}>
                                    <div className="card-img-container">
                                        <img src={mytitle.mainphoto}  class="image-blur" />
                                        <img src={mytitle.mainphoto} class="image-main" />
                                    </div>
                                </Link>
                                    
                                <div className="img-card-description">
                                    <h3>{mytitle.title}</h3>
                                    <h3>{mytitle.price} - €</h3>
                                </div>
                            </div>
                        )})}

                        {results.width != null && results.width.map((mywidth)=>{return(
                            <div className="card-container">
                                <Link className="card-container" to = {`/buyproduct/${mywidth.idproduct}`}>
                                    <div className="card-img-container">
                                        <img src={mywidth.mainphoto}  class="image-blur" />
                                        <img src={mywidth.mainphoto} class="image-main" />
                                    </div>
                                </Link>
                                    
                                <div className="img-card-description">
                                    <h3>{mywidth.title}</h3>
                                    <h3>{mywidth.price} - €</h3>
                                </div>
                            </div>
                        )})}
                    </div>
                )}  
            </div>

            <Footer/> 
        </>
    )
}export default SearchBar