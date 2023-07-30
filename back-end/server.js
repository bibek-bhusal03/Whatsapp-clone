//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express()
const port = process.env.PORT || 9000
const pusher = new Pusher({
  appId: "1638610",
  key: "a73723a5b47246c8764a",
  secret: "2907c0e1acceddeae31e",
  cluster: "ap2",
  useTLS: true
});


// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});


// DB config
const connection_url = 'mongodb+srv://bibekbhusal45:NYDL6lEowPdR2ohY@cluster0.dqojc6c.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.once("open", () => {
  console.log("db connected")
const myCollection = db.collection('messagecontents')
const changeStream = myCollection.watch()
 
 changeStream.on('change', (change)=> {
  console.log(change);
  

  if(change.operationType == 'insert') {
    const messageDetails = change.fullDocument;
    pusher.trigger('messages', 'inserted', {
      name: messageDetails.name,
      message: messageDetails.message,
      received: messageDetails.received
    })
  } else {
    console.log("Error triggering Pusher");
  }
 })
});
// ??

// api routes 
app.get('/', (req, res) => res.status(200).send('hello world'))

app.get('/messages/sync', async (req, res) => {
  try {
    const messages = await Messages.find();
    res.status(200).send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/messages/new', async (req, res) => {
  const dbMessage = req.body;

  try {
    const createdMessage = await Messages.create(dbMessage);
    res.status(201).send(createdMessage);
  } catch (err) {
    res.status(500).send(err);
  }
});


// listen
app.listen(port, ()=> console.log(`Listening on localhost:${port}`))