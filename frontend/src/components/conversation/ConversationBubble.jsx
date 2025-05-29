import React from 'react';
import Avatar from '../ui/Avatar';
import VoiceVisualizer from '../VoiceVisualizer';

const ConversationBubble = ({ message, isUser }) => {
  const alignmentClass = isUser ? 'justify-end' : 'justify-start';
  const bubbleColorClass = isUser 
    ? 'bg-blue-500 text-white' 
    : 'bg-gray-100 text-gray-800';

  const formattedTime = new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(message.timestamp));

  return (
    <div className={`flex items-end gap-2 mb-4 ${alignmentClass}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar 
            src={message.sender.avatar} 
            fallback={message.sender.name}
            size="sm"
          />
        </div>
      )}
      
      <div className="max-w-[70%]">
        <div className={`rounded-2xl px-4 py-2.5 ${bubbleColorClass}`}>
          {message.isAudio ? (
            <div className="h-10 w-32">
              <VoiceVisualizer 
                isActive={false} 
                color={isUser ? 'rgba(255, 255, 255, 0.8)' : 'rgba(59, 130, 246, 0.8)'} 
              />
            </div>
          ) : (
            <p>{message.content}</p>
          )}
        </div>
        <span className="text-xs text-gray-500 mt-1 block">
          {formattedTime}
        </span>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <Avatar 
            src={message.sender.avatar} 
            fallback={message.sender.name}
            size="sm"
          />
        </div>
      )}
    </div>
  );
};

export default ConversationBubble;
