import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import axios from './axios'
import { useStateValue } from './StateProvider';

function Chat({ messages }) {
   const [germ, setGerm] = useState('');
    const [{ user }, dispatch] = useStateValue();

useEffect(() => {
  setGerm(Math.floor(Math.random() * 5000 ))
}, []);

  const [input, setInput] = useState("");
  
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
      message: input, 
      name: "Demo Name",
      timestamp: "just now!..",
      received: true,
    });
    
    setInput('');
  };
   return (

    <div className='chat'>
      <div className="chat__header">
        <Avatar src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${germ}`}/>

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ....</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
         <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
 <div className="chat__body">
  {messages.map(message => (
  <p key={message.key} className={`chat__message ${true && "chat__reciever"}`}>
    <span className='chat__name'>{message.name}</span> 
    {message.message}
    
    <span className="chat__timestamp">
      {message.timestamp}
    </span>
    </p>
  ))}
    
    
 </div>

 <div className="chat__footer">
  <InsertEmoticonIcon />
  <form>
    <input 
    value={input}
    onChange={e => setInput(e.target.value)}
    type="text"
   placeholder='Type a message' 
    />
    <button onClick={sendMessage} type='submit'>
    Send a message
    </button>
  </form>
  <MicIcon />
 </div>
    </div>
  )
}

export default Chat