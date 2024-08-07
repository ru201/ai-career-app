import React, { useState } from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from '../components/navbar';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import { MainContainer, ChatContainer, MessageInput, TypingIndicator, MessageList, Message } from '@chatscope/chat-ui-kit-react';
import { useSelector } from 'react-redux';
import { GenerateMessage } from "../apiHelpers";

export default function Chatbot() {
  const interests = useSelector((state) => state.data.interests);
  const skills = useSelector((state) => state.data.skills);
  const values = useSelector((state) => state.data.values);
  const careers = useSelector((state) => state.data.careers);
  const name = useSelector((state) => state.data.name);

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: `Hi ${name}! I'm Assistant Anne, your personal career advisor and life mentor.\n\nI am able to use your profile and career recommendations to help you find your perfect career and answer any questions you may have.\n\nHow may I assist you today?`,
      sender: "ChatGPT",
      direction: "incoming"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };

    const newMessages = [...messages, newMessage];

    // Update message states
    setMessages(newMessages);

    // Typing indicator
    setTyping(true);
    // Process message to chatGPT (send over and see response)
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const systemMessage = [
      {
        role: "system",
        content: "You are Assistant Anne, a friendly, motivating career advisor and life mentor for recent high school graduates who may not know what career they want to pursue. Only output plain text. Do not output markdown."
      },
      {
        role: "user",
        content: `The data objects below are my interests, skills, values and AI-generated recommended careers you provided. Help me with any queries I have regarding my profile and career decision making. Make it personalised and adaptable to my messages. Only output plain text. Do not output markdown.
        Interests: ${JSON.stringify(interests)}.
        Skills: ${skills.toString()}.
        Values: ${JSON.stringify(values)}.
        Careers: ${JSON.stringify(careers)}.`
      }
    ];


    const response = await GenerateMessage([...systemMessage, ...apiMessages]);

    console.log(response);

    setMessages(
      [...chatMessages, {
        message: response,
        sender: "ChatGPT",
        direction: "incoming"
      }]
    )

    setTyping(false);

  }

  return (
    <div id='chatbot' className='base'>
      <Header />
      <div className="main">
        <MainContainer style={{padding: '0 0.2em'}}>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="Typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message style={{fontSize: '0.7em'}} key={i} model={{ message: message.message, direction: message.direction, sender: message.sender }} />
              ))}
            </MessageList>
            <MessageInput style={{fontSize: '0.7em'}} placeholder='Type message here' onSend={handleSend} attachButton={false} />
          </ChatContainer>
        </MainContainer>
      </div>
      <Navbar />
    </div>
  );
}
