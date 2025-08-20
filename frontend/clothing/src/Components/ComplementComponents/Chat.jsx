import { useEffect, useState, useRef } from 'react'

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import axios from 'axios'

function Chat({usersInfo, closeSignal}){

    const[ extMsgs, setExtMsgs ] = useState()
    const [ myGlobalId, setMyGlobalId ] = useState()
    let url = `ws://localhost:8000/ws/chat/customer_${usersInfo?.customerId}_seller_${usersInfo?.userId}/`
    
    useEffect(()=>{
        let useId = localStorage.getItem("userId")
        setMyGlobalId(parseInt(useId))

        axios.get(`http://localhost:8000/chat/get/msgs/customer_${usersInfo?.customerId}_seller_${usersInfo?.userId}/`).then(res =>{
            console.log("mymsgs: ",res.data)
            setExtMsgs(res.data.results)
        }).catch(err =>{
            console.error(err)
            alert("Couldn't retrieve your messages.")
        })

    },[])
    useEffect(()=>{
        const socket = new WebSocket(url)
        chatSocketRef.current = socket

        socket.onmessage = function(e){
            let data = JSON.parse(e.data)
            let idOfSender = data.id_of_sender

            let localId = localStorage.getItem("userId")
            let intId = parseInt(localId)
            if(intId !== idOfSender){
                let text = data.message

                let newMsg = document.createElement("div")
                newMsg.innerHTML = text
                newMsg.className="msg-recieved"
                let msgsContainer = document.getElementById("convo-container")
                msgsContainer.appendChild(newMsg)
            }
        }

        return () => {
            socket.close()
        }
    },[])
    function closeChat(){
        closeSignal()
    }

    const refMsg = useRef()
    
    const chatSocketRef = useRef(null)
    function handleSend(e){

        if(e.key === "Enter" || e.target.ariaLabel === "Send" ){
            let convoContainer = document.getElementById("convo-container")
            let divMsg = document.createElement("div")//message sent by the user stored in a div
            let myMsg = refMsg.current.value

            // we prepare the div to have styles and the correct text>
            divMsg.classList.add("msg-sent")
            divMsg.innerHTML+= myMsg
            convoContainer.appendChild(divMsg)

            // we erase the content from the Inputtext
            let textContainer = document.getElementById("chat-input")
            textContainer.value = ""
            /*-------------------------------- this is to actually send the message: */
            chatSocketRef.current.send(JSON.stringify({
                'message': myMsg,
                'idOfSender': myGlobalId
            }))
            /*-----------------the architecture requires to store msgs in the data base */

            const msgInfo = {
                content: myMsg,
                sender: myGlobalId,
                url: `customer_${usersInfo?.customerId}_seller_${usersInfo?.userId}`,
                
            };

            axios.post('http://localhost:8000/chat/add/msg/',msgInfo,{
                headers: {
                    'Content-Type': 'application/json'
                }  
            }).then(res=>{
                console.log(res.data)
            }).catch(err =>{
                console.error(err)
                alert("Although the other person will see this message it couldn't be stored, so it won't appear in the convo in the future")
            })
        }

    }

    return(
        <div className="chat-container">

            <Button label="Close" onClick={ closeChat }/>
            <h4>You chat with: {usersInfo.email}</h4>
            <div className="conversation-container" id="convo-container">
                {extMsgs && extMsgs.map((msg)=>{return(
                    <div className={(msg.sender == myGlobalId ? 'msg-sent':'msg-recieved')} >{msg.content}</div>
                )})}
            </div>
            <InputText maxlength="140" 
                id="chat-input" 
                placeholder="Type a message" 
                ref={ refMsg } 
                onKeyDown={handleSend}
            />
            <Button label="Send" onClick={ handleSend }/>
        </div>
    )



} export default Chat