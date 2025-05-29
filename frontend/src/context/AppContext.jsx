import React, { createContext, useState, useContext, useEffect } from 'react';
import { generateMockPatients, generateMockAppointments } from '../mock/mockData';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Ana García', specialty: 'Cardiología', color: '#3B82F6' },
    { id: 2, name: 'Dr. Carlos Mendoza', specialty: 'Neurología', color: '#10B981' },
    { id: 3, name: 'Dr. María Rodriguez', specialty: 'Pediatría', color: '#F59E0B' },
    { id: 4, name: 'Dr. Javier Lopez', specialty: 'Traumatología', color: '#EC4899' },
    { id: 5, name: 'Dr. Sofía Morales', specialty: 'Medicina Interna', color: '#8B5CF6' }
  ]);
  
  /*const [rooms, setRooms] = useState([
    { id: 101, name: 'Consulta 101', status: 'available' },
    { id: 102, name: 'Consulta 102', status: 'occupied' },
    { id: 103, name: 'Consulta 103', status: 'available' },
    { id: 201, name: 'Urgencias 201', status: 'available' },
    { id: 202, name: 'Urgencias 202', status: 'cleaning' },
    { id: 301, name: 'Quirófano 301', status: 'reserved' },
  ]);*/

  /*const [equipment, setEquipment] = useState([
    { id: 1, name: 'Electrocardiógrafo', status: 'available' },
    { id: 2, name: 'Equipo de Rayos X', status: 'maintenance' },
    { id: 3, name: 'Máquina de Anestesia', status: 'available' },
    { id: 4, name: 'Ecógrafo', status: 'available' },
    { id: 5, name: 'Monitor de signos vitales', status: 'in-use' },
  ]);*/

  // Voice assistant conversation history
  //const [conversations, setConversations] = useState([]);

  // Add a message to the conversation
  /*const addMessage = (role, content) => {
    setConversations(prev => [...prev, { role, content, timestamp: new Date() }]);
  };*/

  // Reset conversation
  /*const resetConversation = () => {
    setConversations([]);
  };*/

  // Add a new patient
  const addPatient = (patient) => {
    const newPatient = {
      id: patients.length + 1,
      ...patient,
      registrationDate: new Date()
    };
    setPatients(prev => [...prev, newPatient]);
    return newPatient;
  };

  // Update patient severity
  const updatePatientSeverity = (patientId, severity) => {
    setPatients(prev => 
      prev.map(patient => 
        patient.id === patientId ? { ...patient, severity } : patient
      )
    );
  };

  // Add a new appointment
  const addAppointment = (appointment) => {
    const newAppointment = {
      id: appointments.length + 1,
      ...appointment,
      createdAt: new Date()
    };
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  };

  // Update appointment
  const updateAppointment = (appointmentId, data) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === appointmentId ? { ...appointment, ...data } : appointment
      )
    );
  };

  // Process voice assistant input and generate a recommendation
  const processVoiceInput = (input) => {
    // In a real application, this would call an AI service
    // For demo purposes, we'll simulate a response
    
    // Generate random severity between 1-5
    const severity = Math.floor(Math.random() * 5) + 1;
    
    // Select random doctor
    const assignedDoctor = doctors[Math.floor(Math.random() * doctors.length)];
    
    // Select random available room
    const availableRooms = rooms.filter(room => room.status === 'available');
    const assignedRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
    
    // Select random equipment
    const availableEquipment = equipment.filter(eq => eq.status === 'available');
    const assignedEquipment = availableEquipment[Math.floor(Math.random() * availableEquipment.length)];
    
    // Generate possible conditions based on input text
    let possibleCondition = "Condición no determinada";
    
    if (input.toLowerCase().includes("dolor")) {
      if (input.toLowerCase().includes("cabeza")) {
        possibleCondition = "Posible cefalea o migraña";
      } else if (input.toLowerCase().includes("pecho")) {
        possibleCondition = "Posible angina de pecho";
        // Higher severity for chest pain
        severity = 4;
      } else if (input.toLowerCase().includes("estómago")) {
        possibleCondition = "Posible gastritis o úlcera";
      }
    } else if (input.toLowerCase().includes("fiebre")) {
      possibleCondition = "Posible infección viral o bacteriana";
    } else if (input.toLowerCase().includes("respirar") || input.toLowerCase().includes("respiración")) {
      possibleCondition = "Posible problema respiratorio";
      // Higher severity for breathing problems
      severity = 4;
    }
    
    return {
      summary: `Paciente con ${possibleCondition.toLowerCase()}`,
      possibleCondition,
      severity,
      assignedDoctor,
      assignedRoom,
      assignedEquipment,
      recommendations: "Se recomienda realizar exámenes adicionales para confirmar diagnóstico."
    };
  };

  // Initialize with mock data
  useEffect(() => {
    setPatients(generateMockPatients(20));
    setAppointments(generateMockAppointments(40));
  }, []);

  const contextValue = {
    patients,
    appointments,
    doctors,
    //rooms,
    //equipment,
    //conversations,
    //addMessage,
    //resetConversation,
    addPatient,
    updatePatientSeverity,
    addAppointment,
    updateAppointment,
    //processVoiceInput
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}