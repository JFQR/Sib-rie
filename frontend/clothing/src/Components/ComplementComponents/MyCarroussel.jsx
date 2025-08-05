
import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';


export default function BasicDemo({MyImgs}) {
    const [images, setImages] = useState(null);
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 4
        }
    ];

    useEffect(() => {
        console.log("MY images in the child",MyImgs)
        setImages(MyImgs)
    }, [MyImgs])

    const itemTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{ width: '60%' }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{width: '40%'}} />
    }

    return (
        <div className="card">
            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }} 
                item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div>
    )
}