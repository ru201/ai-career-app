import React from "react";
import { useState } from 'react';
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import { MainContainer, ChatContainer, MessageInput, TypingIndicator, MessageList, Message} from '@chatscope/chat-ui-kit-react'

export default function Chatbot () {

    const API_KEY = process.env.REACT_APP_API_KEY;

    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
        message: "Hello, how may I help you today?",
        sender: "ChatGPT",
        direction: "incoming"
        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
          message: message,
          sender: "user",
          direction: "outgoing"
        }
    
        const newMessages = [...messages, newMessage];
    
        // update message states
        setMessages(newMessages);
    
        // typing indicator
        setTyping(true);
        // process message to chatGPT ( send over see response)
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages) {
        // chatMessages { sender: "user" pr "ChatGPT", message: "The message content here" }
        // apuMessages { role: "user" or "assistant", content: "The message content here"}

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
            role = "assistant"
            } else {
            role = "user"
            }
            return { role: role, content: messageObject.message}
        }); // build this array, allows us to go over all chatmessages and create a new object
        
        const systemMessage = { // initial message to define how we want chatGPT to talk
            role: "system",
            content: "Act as a friendly career advisor and personal counsellor for senior high school students who may not know what career they want to pursue."
          }
      
          const apiRequestBody = {
            "model" : "gpt-3.5-turbo",
            "messages": [
              systemMessage,
              ...apiMessages
            ]
          }
      
          await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + API_KEY,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
          }).then((data) => {
            return data.json();
          }).then((data) => {
            console.log(data)
            console.log(data.choices[0].message.content)
            setMessages(
              [...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT",
                direction: "incoming"
              }]
            );
            setTyping(false)
        });
    }

    return (
        <div id='chatbot' className='base'>
            <Header />
            <div className="main">
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                        typingIndicator={typing ? <TypingIndicator content="Typing"></TypingIndicator> : null}
                        >
                        {messages.map((message, i) => { // Create a message component for each messages
                            return <Message key={i} model={message}></Message>
                        })}
                        </MessageList>
                        <MessageInput placeholder='Type message here' onSend={handleSend}  attachButton='false'> 

                        </MessageInput>
                    </ChatContainer>
                </MainContainer>
            </div>
            <Navbar />   
        </div>
    );

}
