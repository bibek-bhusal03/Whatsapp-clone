import React from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material'
import MicIcon from '@mui/icons-material/Mic';
function Chat() {
  return (
    <div className='chat'>
      <div className="chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ....</p>
        </div>
        <div className="chat_headerRight">
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
   <p className='chat__message'>
    <span className='chat__name'>Bibek</span> 
    
    This is the message
    
    <span className="chat__timestamp">
      {new Date().toUTCString()}
    </span>
    </p>
    
    <p className='chat__message chat__reciever'>
    <span className='chat__name'>Bibek</span> 
    
    This is the message
    
    <span className="chat__timestamp">
      {new Date().toUTCString()}
    </span>
    </p>
    
    
 </div>

 <div className="chat__footer">
  <InsertEmoticon />
  <form>
    <input type="text"
   placeholder='Type a message' 
    />
    <button  type='submit'>
    Send a messages
    </button>
  </form>
  <MicIcon />
 </div>
    </div>
  )
}

export default Chat