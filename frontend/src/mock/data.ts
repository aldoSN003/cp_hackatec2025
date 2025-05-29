import { User, ConversationMessage, PatientSummary, Patient } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    role: 'patient',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'user2',
    name: 'Dr. Sarah Chen',
    role: 'doctor',
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'user3',
    name: 'Nurse Maria Rodriguez',
    role: 'nurse',
    avatar: 'https://images.pexels.com/photos/5207082/pexels-photo-5207082.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 'patient1',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    currentSymptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
    assignedDoctor: 'Dr. Sarah Chen',
    assignedRoom: 'Room 302',
    assignedEquipment: ['ECG Monitor', 'Oxygen Supply'],
  },
];

// Mock Conversation Messages
export const mockConversationMessages: ConversationMessage[] = [
  {
    id: 'msg1',
    sender: mockUsers[2], // Nurse
    content: "Hello John, I'm Nurse Maria. How are you feeling today?",
    timestamp: new Date(Date.now() - 35 * 60000), // 35 minutes ago
  },
  {
    id: 'msg2',
    sender: mockUsers[0], // Patient
    content: "I've been having chest pain since last night. It gets worse when I try to breathe deeply.",
    timestamp: new Date(Date.now() - 34 * 60000), // 34 minutes ago
  },
  {
    id: 'msg3',
    sender: mockUsers[2], // Nurse
    content: "I'm sorry to hear that. Can you describe the pain? Is it sharp, dull, or pressure-like?",
    timestamp: new Date(Date.now() - 33 * 60000), // 33 minutes ago
  },
  {
    id: 'msg4',
    sender: mockUsers[0], // Patient
    content: "It's a sharp pain, mostly on the left side. And I'm feeling quite short of breath.",
    timestamp: new Date(Date.now() - 32 * 60000), // 32 minutes ago
  },
  {
    id: 'msg5',
    sender: mockUsers[2], // Nurse
    content: "Thank you for describing that. Have you experienced any other symptoms like sweating, nausea, or dizziness?",
    timestamp: new Date(Date.now() - 31 * 60000), // 31 minutes ago
  },
  {
    id: 'msg6',
    sender: mockUsers[0], // Patient
    content: "Yes, I've been sweating more than usual and felt a bit dizzy when getting up this morning.",
    timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
  },
  {
    id: 'msg7',
    sender: mockUsers[2], // Nurse
    content: "I understand. Do you have any history of heart problems or high blood pressure?",
    timestamp: new Date(Date.now() - 28 * 60000), // 28 minutes ago
  },
  {
    id: 'msg8',
    sender: mockUsers[0], // Patient
    content: "I've been diagnosed with high blood pressure about 5 years ago. I'm taking medication for it.",
    timestamp: new Date(Date.now() - 27 * 60000), // 27 minutes ago
  },
];

// Mock Patient Summary
export const mockPatientSummary: PatientSummary = {
  patientId: 'patient1',
  possibleConditions: ['Acute Coronary Syndrome', 'Angina', 'Pericarditis'],
  recommendedTests: ['ECG', 'Cardiac Enzymes', 'Chest X-ray'],
  assignedRoom: 'Room 302',
  assignedDoctor: 'Dr. Sarah Chen',
  assignedEquipment: ['ECG Monitor', 'Oxygen Supply', 'IV Line'],
  urgencyLevel: 'high',
  notes: 'Patient presents with acute chest pain and shortness of breath. History of hypertension. Needs immediate cardiac workup.',
};