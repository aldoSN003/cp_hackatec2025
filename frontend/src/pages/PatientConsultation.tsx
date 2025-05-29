import React, { useState } from 'react';
import ConversationView from '../components/conversation/ConversationView';
import PatientSummaryCard from '../components/patient/PatientSummaryCard';
import { ConversationMessage } from '../types';
import { mockUsers, mockConversationMessages, mockPatientSummary } from '../mock/data';
import { Stethoscope, ClipboardCheck, Calendar, Clock } from 'lucide-react';

const PatientConsultation: React.FC = () => {
  const [messages, setMessages] = useState<ConversationMessage[]>(mockConversationMessages);
  const [showSummary, setShowSummary] = useState(false);
  const [isConsultationComplete, setIsConsultationComplete] = useState(false);
  
  const currentUser = mockUsers[0]; // Patient
  const nurse = mockUsers[2]; // Nurse

  const handleSendMessage = (content: string, isAudio: boolean = false) => {
    const newMessage: ConversationMessage = {
      id: `msg${messages.length + 1}`,
      sender: currentUser,
      content,
      timestamp: new Date(),
      isAudio,
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate nurse response after patient message
    setTimeout(() => {
      const nurseResponse: ConversationMessage = {
        id: `msg${messages.length + 2}`,
        sender: nurse,
        content: "Thank you for providing that information. Based on your symptoms, I'll generate a preliminary assessment. The doctor will see you shortly.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, nurseResponse]);
      setIsConsultationComplete(true);
      
      // Show summary after the nurse's final response
      setTimeout(() => {
        setShowSummary(true);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Patient Consultation</h1>
          <p className="text-gray-600">Talk to your healthcare provider and receive a preliminary assessment</p>
        </header>
        
        {/* Status Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between">
          <div className="flex items-center gap-2 text-blue-600">
            <Stethoscope size={20} />
            <span className="font-medium">Nurse Consultation</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} />
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-green-600">
            <ClipboardCheck size={18} />
            <span className="font-medium">Active Session</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Conversation Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md h-[600px]">
              <ConversationView
                currentUser={currentUser}
                nurse={nurse}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
          
          {/* Patient Summary Area */}
          <div className="lg:col-span-1">
            {showSummary ? (
              <div className="h-[600px] overflow-y-auto">
                <PatientSummaryCard
                  summary={mockPatientSummary}
                  patientName={currentUser.name}
                />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md h-[600px] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <ClipboardCheck size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Patient Summary</h3>
                <p className="text-gray-600 mb-4">
                  {isConsultationComplete 
                    ? "Generating your assessment..." 
                    : "Complete the consultation to receive your assessment"}
                </p>
                {isConsultationComplete && (
                  <div className="w-full max-w-xs">
                    <div className="bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
                      <div className="bg-blue-500 h-1.5 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientConsultation;