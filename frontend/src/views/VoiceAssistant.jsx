import React, { useState } from 'react';
import ConversationView from '../components/conversation/ConversationView.jsx';
import PatientSummaryCard from '../components/patient/PatientSummaryCard.jsx';
import { mockUsers, mockConversationMessages, mockPatientSummary } from '../mock/data.jsx';
import { Stethoscope, ClipboardCheck, Calendar, Clock } from 'lucide-react';
import {getAiPreDiagnosis} from "./ai.js";
import { useEffect } from 'react';


// open ai

import fs from "fs";
import path from "path";
import OpenAI from "openai";


import axios from "axios";




const VoiceAssistant = () => {
  const [messages, setMessages] = useState(mockConversationMessages);
  const [showSummary, setShowSummary] = useState(false);
  const [isConsultationComplete, setIsConsultationComplete] = useState(false);

  const [summaryData, setSummaryData] = useState(null);

  const tts = async (input) => {
    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true, // Solo si estás seguro
      });

      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "coral", // o "shimmer", "echo", etc.
        input
      });


      // Convertir la respuesta a blob y reproducirla
      const blob = new Blob([await mp3.arrayBuffer()], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      await audio.play();
    } catch (err) {
      console.error("Error generando o reproduciendo audio:", err);
    }
  };


  useEffect(() => {




    if (isConsultationComplete) {
      const fetchPreDiagnosis = async () => {
        const data = await getAiPreDiagnosis(
            "Victor Hugo Lizama Peña",
            ["diabetes", "hipertensión"],
            ["dolor de cabeza", "escurrimiento nasal"],
            "cansancio"
        );
        setSummaryData(data);
        setShowSummary(true); // <- Solo mostrar cuando esté lista
      };

      fetchPreDiagnosis();
    }
  }, [isConsultationComplete]);


  const currentUser = mockUsers[0];
  const nurse = mockUsers[2];

  const handleSendMessage = (content, isAudio = false) => {
    const newMessage = {
      id: `msg${messages.length + 1}`,
      sender: currentUser,
      content,
      timestamp: new Date(),
      isAudio,
    };

    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const nurseResponse = {
        id: `msg${messages.length + 2}`,
        sender: nurse,
        content: "Gracias por proporcionar esa información. Basándome en sus síntomas, generaré una evaluación preliminar. El doctor lo atenderá en breve.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, nurseResponse]);
      setIsConsultationComplete(true);

      setTimeout(() => {
        setShowSummary(true);
      }, 1000);
    }, 1500);
  };



  return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Consulta del Paciente</h1>
            <p className="text-gray-600">Hable con su proveedor de atención médica y reciba una evaluación preliminar</p>
          </header>


          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between">
            <div className="flex items-center gap-2 text-blue-600">
              <Stethoscope size={20} />
              <span className="font-medium">Consulta de Enfermería</span>
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
              <span className="font-medium">Sesión Activa</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md h-[600px]">

                <ConversationView
                    currentUser={currentUser}
                    nurse={nurse}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    setIsConsultationComplete={()=>setIsConsultationComplete(true)}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              {showSummary && summaryData ?  (
                  <div className="h-[600px] overflow-y-auto">
                    <PatientSummaryCard
                        assignedDoctor={summaryData.assignedDoctor}
                        assignedEquipment={summaryData.assignedEquipment}
                        assignedRoom={summaryData.assignedRoom}
                        notes={summaryData.notes}
                        patientId={summaryData.patientId}
                        possibleConditions={summaryData.possibleConditions}
                        recommendedTests={summaryData.recommendedTests}
                        urgencyLevel={summaryData.urgencyLevel}
                    />
                  </div>
              ) : (
                  <div className="bg-white rounded-xl shadow-md h-[600px] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <ClipboardCheck size={28} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Resumen del Paciente</h3>
                    <p className="text-gray-600 mb-4">
                      {isConsultationComplete
                          ? "Generando su evaluación..."
                          : "Complete la consulta para recibir su evaluación"}
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

export default VoiceAssistant;