'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'system', text: 'Workflow activated. How can I help you?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chats, setChats] = useState([
    { id: 1, title: 'Workflow 1', lastMessage: 'Started workflow...' },
    { id: 2, title: 'Workflow 2', lastMessage: 'Ready to automate' },
  ]);
  const [activeChat, setActiveChat] = useState(1);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'assistant',
        text: `This is a response based on your workflow.`,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);

    setInputMessage('');
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-blue-100 shadow-lg flex flex-col">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold">
          Workflows
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`cursor-pointer px-4 py-3 border-b border-blue-100 hover:bg-blue-50 transition-colors ${
                activeChat === chat.id ? 'bg-blue-100' : ''
              }`}
            >
              <div className="font-semibold text-gray-900">{chat.title}</div>
              <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white text-lg font-bold">
          {chats.find(c => c.id === activeChat)?.title || 'Workflow Assistant'}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : msg.type === 'system'
                    ? 'bg-green-50 text-green-900 border border-green-200'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about your workflow..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
