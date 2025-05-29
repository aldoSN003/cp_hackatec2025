export type UserRole = 'patient' | 'doctor' | 'nurse' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  medicalHistory: string[];
  currentSymptoms: string[];
  assignedDoctor?: string;
  assignedRoom?: string;
  assignedEquipment?: string[];
}

export interface ConversationMessage {
  id: string;
  sender: User;
  content: string;
  timestamp: Date;
  isAudio?: boolean;
}

export interface PatientSummary {
  patientId: string;
  possibleConditions: string[];
  recommendedTests: string[];
  assignedRoom: string;
  assignedDoctor: string;
  assignedEquipment: string[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  notes: string;
}