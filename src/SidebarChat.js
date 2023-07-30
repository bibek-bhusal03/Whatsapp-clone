import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material'

function SidebarChat({ addNewChat}) {
  const [germ, setGerm] = useState('');

useEffect(() => {
  setGerm(Math.floor(Math.random() * 5000 ))
}, [])

const createChat = () => {
  const roomName = prompt("Please enter name for chat")

  if(roomName) {
    // do database
  }
};
  return !addNewChat ? (
    <div className='sidebarChat'>
      <Avatar src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${germ}`} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>This is the last message</p>
      </div>
    </div> 
  ): (
    <div
    onClick={createChat} 
    className="sidebarChat">
  <h2>Add new chat</h2>
    </div>
  )
}

export default SidebarChat