import React, { useState } from 'react'
import MessageForm from './components/MessageForm'
import MessageList from './components/MessageList'

const App = () => {
  const [messages, setMessages] = useState([])

  const addMessage = (message) => {
    setMessages([...messages, message])
  }

  const deleteMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index))
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>EmailJS App</h1>
      <MessageForm onAddMessage={addMessage} />
      <MessageList messages={messages} onDelete={deleteMessage} />
    </div>
  )
}

export default App
