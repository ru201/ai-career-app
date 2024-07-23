import React, { useState } from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from '../components/navbar';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import { MainContainer, ChatContainer, MessageInput, TypingIndicator, MessageList, Message } from '@chatscope/chat-ui-kit-react';
import { useSelector } from 'react-redux';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true });

export default function Chatbot() {
  const interests = useSelector((state) => state.data.interests);
  const skills = useSelector((state) => state.data.skills);
  const values = useSelector((state) => state.data.values);
  const careers = useSelector((state) => state.data.careers);

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
        content: "Act as a friendly, motivating career advisor and personal counsellor for senior high school students who may not know what career they want to pursue. Only output plain text. Do not output markdown."
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

    await openai.chat.completions.create({
      messages: [
        ...systemMessage,
        ...apiMessages
      ],
      model: "gpt-4o-mini"
    }).then((data) => {
      console.log(data)
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
                <Message key={i} model={{ message: message.message, direction: message.direction, sender: message.sender }} />
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
