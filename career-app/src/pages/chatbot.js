import React, { useState } from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from '../components/navbar';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import { MainContainer, ChatContainer, MessageInput, TypingIndicator, MessageList, Message } from '@chatscope/chat-ui-kit-react';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

export default function Chatbot() {
  const interests = useSelector((state) => state.data.interests);
  const skills = useSelector((state) => state.data.skills);
  const values = useSelector((state) => state.data.values);
  const careers = useSelector((state) => state.data.careers);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, how may I help you today?",
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
        content: "Act as a friendly, motivating career advisor and personal counsellor for senior high school students who may not know what career they want to pursue."
      },
      {
        role: "user",
        content: `The data objects below are my interests, skills, values and AI-generated recommended careers you provided. Help me with any queries I have regarding my profile and career decision making. Make it personalised and adaptable to my messages.
        Interests: ${JSON.stringify(interests)}.
        Skills: ${skills.toString()}.
        Values: ${JSON.stringify(values)}.
        Careers: ${JSON.stringify(careers)}.`
      }
    ];

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        ...systemMessage,
        ...apiMessages
      ]
    };

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
      setMessages(
        [...chatMessages, {
          message: `${data.choices[0].message.content}`,
          sender: "ChatGPT",
          direction: "incoming"
        }]
      );
      setTyping(false);
    });
  }

  const CustomMessage = ({ message, direction, sender }) => {
    return (
      <div className={`message ${direction} ${sender}`}>
        <Markdown remarkPlugins={[remarkGfm]}>
          {message}
        </Markdown>
      </div>
    );
  };

  return (
    <div id='chatbot' className='base'>
      <Header />
      <div className="main">
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="Typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={{ message: message.message, direction: message.direction, sender: message.sender }}>
                  <CustomMessage
                    message={message.message}
                    direction={message.direction}
                    sender={message.sender}
                  />
                </Message>
              ))}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend} attachButton={false} />
          </ChatContainer>
        </MainContainer>
      </div>
      <Navbar />
    </div>
  );
}
