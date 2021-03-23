
import React, { useState, useEffect } from 'react';
import socket from "../socketio.js"


const App = () => {
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
    let user = prompt("Please enter a username");
    setUsername(user);
    socket.on("FromAPI", data => {
      setResponse(data);
    })
    socket.on('random', (data) => {
      console.log(data, 'response')
    })
  }, []);

  socket.on('message', data => {
    let newMessages = [...messages]
    newMessages.push(data);
    setMessages(newMessages);
  })

 const onFormSubmit = (e) => {
  e.preventDefault();
  let formData = {
    user: username,
    message: e.target.children[0].value
  }

  socket.emit('message', formData)
  e.target.children[0].value = '';
 };

  return(
   <div>
     {response} <br>
     </br>
     {messages.map((i) =>  <div>{i.user}: {i.message}</div>)}
     <form onSubmit={onFormSubmit}>
     <input type='text'></input>
     <input type="submit"></input>
     </form>

   </div>
  )
}

export default App;