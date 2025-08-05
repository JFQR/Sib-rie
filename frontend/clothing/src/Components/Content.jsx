
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';

import { useNavigate } from 'react-router-dom';

export default function Content() {
    const menuLeft = useRef(null);
    const toast = useRef(null);
    const navigate = useNavigate()


    function retrieveSelection(selection){
        navigate(`/searchbar/${selection}`)
    }

    const items = [
        {
            label: 'Upper body',
            items: [
                {
                    label: 'T-shirt',
                    command: (e) => retrieveSelection(e.item.label)

                },
                {
                    label: 'Shirt',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Blouse',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'longshoreman',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Jumpers',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Sweatshirt',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Vest',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Coat',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Waistcoat',
                    command: (e) => retrieveSelection(e.item.label)
                },
            ]
        },
        {
            label: 'Lower body',
            items: [
                {
                    label: 'Jeans',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Shorts',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Skirt',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Leggings',
                    command: (e) => retrieveSelection(e.item.label)
                }
            ]
        },
        {
            label: 'Shoes',
            items: [
                {
                    label: 'Shoes',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Trainers',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Heels',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Sandals',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Boots',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Loafers',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Spardilles',
                    command: (e) => retrieveSelection(e.item.label)
                },
            ]
        },
        {
            label: 'Accessories',
            items: [
                {
                    label: 'Scarf',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Belts',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Hats',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Gloves',
                    command: (e) => retrieveSelection(e.item.label)
                },
                {
                    label: 'Glasses',
                    command: (e) => retrieveSelection(e.item.label)
                },
            ]
        },
    ];

    return (
        <div className="card flex justify-content-center flex" >
            <Toast  ref={toast}></Toast>
            <Menu style={{maxHeight:"400px",overflowY:"scroll"}} model={items} popup ref={menuLeft} id="popup_menu_left" />
            <Button label="Explore" icon="pi pi-align-left"  onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
        </div>
    )
}
        