import React from 'react';

// Usuarios de prueba
const mockUsers = [
  {
    id: 'user1',
    name: 'Juan Pérez',
    role: 'patient',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'user2',
    name: 'Dra. Sarah Chen',
    role: 'doctor',
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'user3',
    name: 'Enfermera María Rodríguez',
    role: 'nurse',
    avatar: 'https://images.pexels.com/photos/5207082/pexels-photo-5207082.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Pacientes de prueba
const mockPatients = [
  {
    id: 'patient1',
    name: 'Juan Pérez',
    age: 45,
    gender: 'Masculino',
    medicalHistory: ['Hipertensión', 'Diabetes Tipo 2'],
    currentSymptoms: ['Dolor en el pecho', 'Dificultad para respirar', 'Fatiga'],
    assignedDoctor: 'Dra. Sarah Chen',
    assignedRoom: 'Sala 302',
    assignedEquipment: ['Monitor ECG', 'Suministro de Oxígeno'],
  },
];

// Mensajes de conversación de prueba
// Mensajes de conversación de prueba
const mockConversationMessages = [
  {
    id: 'msg1',
    sender: mockUsers[2], // Enfermera
    content: "Hola Juan, soy la Enfermera María. ¿Qué lo trae a consulta el día de hoy?",
    timestamp: new Date(Date.now() - 35 * 60000),
  },
  {
    id: 'msg2',
    sender: mockUsers[0], // Paciente
    content: "Me he sentido muy cansado últimamente. También tengo dolor de cabeza y escurrimiento nasal.",
    timestamp: new Date(Date.now() - 34 * 60000),
  },
  {
    id: 'msg3',
    sender: mockUsers[2],
    content: "Entiendo. ¿Desde cuándo presenta estos síntomas?",
    timestamp: new Date(Date.now() - 33 * 60000),
  },
  {
    id: 'msg4',
    sender: mockUsers[0],
    content: "Desde hace tres días. Empezó con el cansancio y luego vinieron el dolor de cabeza y el escurrimiento nasal.",
    timestamp: new Date(Date.now() - 32 * 60000),
  },
  {
    id: 'msg5',
    sender: mockUsers[2],
    content: "Gracias por la información. ¿Tiene alguna condición médica crónica como diabetes o hipertensión?",
    timestamp: new Date(Date.now() - 31 * 60000),
  },
  {
    id: 'msg6',
    sender: mockUsers[0],
    content: "Sí, tengo diabetes y también hipertensión. Tomo medicamentos para ambas.",
    timestamp: new Date(Date.now() - 30 * 60000),
  },
  {
    id: 'msg7',
    sender: mockUsers[2],
    content: "Perfecto, gracias por compartirlo. En base a sus síntomas y condiciones previas, voy a generar una evaluación preliminar.",
    timestamp: new Date(Date.now() - 29 * 60000),
  },
  {
    id: 'msg8',
    sender: mockUsers[2],
    content: "El doctor revisará su caso en breve.",
    timestamp: new Date(Date.now() - 28 * 60000),
  },
];

// Resumen del paciente de prueba
const mockPatientSummary = {
  patientId: 'patient1',
  possibleConditions: ['Síndrome Coronario Agudo', 'Angina', 'Pericarditis'],
  recommendedTests: ['ECG', 'Enzimas Cardíacas', 'Radiografía de Tórax'],
  assignedRoom: 'Sala 302',
  assignedDoctor: 'Dra. Sarah Chen',
  assignedEquipment: ['Monitor ECG', 'Suministro de Oxígeno', 'Línea IV'],
  urgencyLevel: 'high',
  notes:
      'El paciente presenta dolor torácico agudo y dificultad respiratoria. Historial de hipertensión. Necesita evaluación cardíaca inmediata.',
};

export {
  mockUsers,
  mockPatients,
  mockConversationMessages,
  mockPatientSummary,
};