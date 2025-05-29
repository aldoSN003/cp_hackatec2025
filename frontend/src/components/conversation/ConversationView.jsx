import React, { useState, useRef, useEffect } from 'react';
import ConversationBubble from './ConversationBubble';
import VoiceVisualizer from '../VoiceVisualizer';
import Button from '../ui/Button';
import { Mic, MicOff, Send } from 'lucide-react';

const ConversationView = ({ currentUser, nurse, messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      onSendMessage("Voice message sent", true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-md">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-blue-50">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-800">{nurse.name}</h2>
          <span className="text-sm text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((message) => (
          <ConversationBubble
            key={message.id}
            message={message}
            isUser={message.sender.id === currentUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className={`rounded-full p-2 ${isRecording ? 'bg-red-100 text-red-500 border-red-500' : ''}`}
            onClick={toggleRecording}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </Button>

          <div className="flex-1 relative">
            {isRecording ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white border border-gray-200 rounded-full overflow-hidden">
                <div className="w-full h-8">
                  <VoiceVisualizer isActive={true} />
                </div>
              </div>
            ) : (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            )}
          </div>

          {!isRecording && (
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
