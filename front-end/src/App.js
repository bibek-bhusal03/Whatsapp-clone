import { useEffect, useState, useContext } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios'
import Login from './Login';
import { UserContext } from './UserContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMessages(response.data);
    })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('a73723a5b47246c8764a', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
 const [{ user }, dispatch] = useStateValue();

  return (

    <div className="app">

      {!user ? (
        <Login />
      ) : (


        <div className="app__body">
          <Sidebar />
          <Chat messages={messages} />

        </div>
      )}
    </div>


  )
}


export default App;
