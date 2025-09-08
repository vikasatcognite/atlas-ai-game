import React, { useEffect, useRef } from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-sm px-4 py-2 rounded-2xl ${
        message.type === 'user'
          ? 'bg-indigo-600 text-white'
          : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center space-x-2 mb-1">
          {message.type === 'user' ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
          <span className="text-xs opacity-70">{message.timestamp}</span>
        </div>
        <div className="whitespace-pre-line text-sm">{message.content}</div>
      </div>
    </div>
  );
};

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
