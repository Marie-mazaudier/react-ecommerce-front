import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { db } from "../firebase";
import {Button} from 'antd'


const Chat = () => {
const [chats,setChats] = useState([])
const [content,setContent] = useState('')
const [readError,setReadError] = useState(null)
const [writeError,setWriteError] = useState(null)

const {user} = useSelector((state) => ({...state}))

useEffect(() => { 
    setReadError(null)
    const fetchData = async () => {
        try{
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                  chats.push(snap.val());
                });
                console.log(chats)
                setChats( chats );
              });
              console.log(chats)
        }catch(error) {
            console.log(error)
            setReadError(error.message)
            
        }
    }
      fetchData()
 }, [])

 const handleSubmit = async(event) => {
    event.preventDefault();
    setWriteError(null)
    try{
        await db.ref("chats/" + 'marie').set({
            content: content,
            timestamp: Date.now(),
            uid: user.email
          });
          setContent('')
       }catch(error) {
           console.log(error)
           setWriteError(error.message)
       }
 }
 const handleChange = (event) => {
    setContent(event.target.value)
 }
 
  return (
    <div>
      <div className="chatbox">
      <ul className='chat-list'>
      {chats.map((chat, index) => {
          const postDate = new Date(chat.timestamp);  
        return (
            <li key={index}>
             <em>{postDate.getDate() + '/' + (postDate.getMonth()+1)} </em>	
             <strong>{chat.uid}: </strong> 
             {chat.content}
            </li>
            )
      })}
       </ul>
    </div>
    <form  onSubmit={handleSubmit}>
        <input 
        onChange={handleChange} 
        value={content}
        />
        {readError ? <p>{writeError}</p> : null}
        <button type="submit">Send</button>
    </form>
    <div>
      Login in as: <strong>{user.email}</strong>
    </div>
  </div>
  );
}

export default Chat;
