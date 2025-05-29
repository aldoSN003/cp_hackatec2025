import { createContext, useContext, useState } from 'react'

const PatientContext = createContext()

export const usePatients = () => useContext(PatientContext)

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([
    {
      id: 'P1001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      room: '302',
      doctor: 'Dr. Smith',
      severity: 3,
      condition: 'Hypertension',
      admissionDate: '2025-03-15',
      lastUpdated: '2025-05-10T09:30:00',
      notes: 'Patient experiencing chest pain and shortness of breath.'
    },
    {
      id: 'P1002',
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      room: '205',
      doctor: 'Dr. Johnson',
      severity: 2,
      condition: 'Migraine',
      admissionDate: '2025-05-08',
      lastUpdated: '2025-05-10T11:15:00',
      notes: 'Recurring migraines with visual aura. Responding well to medication.'
    },
    {
      id: 'P1003',
      name: 'Robert Johnson',
      age: 67,
      gender: 'Male',
      room: '410',
      doctor: 'Dr. Smith',
      severity: 4,
      condition: 'Pneumonia',
      admissionDate: '2025-05-05',
      lastUpdated: '2025-05-10T08:45:00',
      notes: 'Difficulty breathing, elevated temperature. Started on antibiotics.'
    },
    {
      id: 'P1004',
      name: 'Maria Garcia',
      age: 28,
      gender: 'Female',
      room: '118',
      doctor: 'Dr. Johnson',
      severity: 1,
      condition: 'Sprained ankle',
      admissionDate: '2025-05-09',
      lastUpdated: '2025-05-10T14:20:00',
      notes: 'Minor sprain from sports injury. Ice and elevation recommended.'
    },
    {
      id: 'P1005',
      name: 'William Chen',
      age: 54,
      gender: 'Male',
      room: '225',
      doctor: 'Dr. Smith',
      severity: 5,
      condition: 'Acute myocardial infarction',
      admissionDate: '2025-05-10',
      lastUpdated: '2025-05-10T07:30:00',
      notes: 'Admitted through ER. Immediate intervention required.'
    }
  ])

  const [appointments, setAppointments] = useState([
    {
      id: 'A1001',
      title: 'John Doe - Check-up',
      patientId: 'P1001',
      start: new Date(2025, 4, 12, 9, 0),
      end: new Date(2025, 4, 12, 9, 30),
      doctor: 'Dr. Smith'
    },
    {
      id: 'A1002',
      title: 'Jane Smith - Follow-up',
      patientId: 'P1002',
      start: new Date(2025, 4, 12, 10, 0),
      end: new Date(2025, 4, 12, 10, 30),
      doctor: 'Dr. Johnson'
    },
    {
      id: 'A1003',
      title: 'Robert Johnson - Evaluation',
      patientId: 'P1003',
      start: new Date(2025, 4, 12, 11, 0),
      end: new Date(2025, 4, 12, 11, 45),
      doctor: 'Dr. Smith'
    },
    {
      id: 'A1004',
      title: 'Maria Garcia - Discharge',
      patientId: 'P1004',
      start: new Date(2025, 4, 12, 14, 0),
      end: new Date(2025, 4, 12, 14, 30),
      doctor: 'Dr. Johnson'
    },
    {
      id: 'A1005',
      title: 'William Chen - Critical Care',
      patientId: 'P1005',
      start: new Date(2025, 4, 12, 16, 0),
      end: new Date(2025, 4, 12, 17, 0),
      doctor: 'Dr. Smith'
    }
  ])

  const addPatient = (patient) => {
    setPatients([...patients, patient])
  }

  const updatePatient = (id, updatedData) => {
    setPatients(
      patients.map((patient) =>
        patient.id === id ? { ...patient, ...updatedData } : patient
      )
    )
  }

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment])
  }

  const updateAppointment = (id, updatedData) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, ...updatedData } : appointment
      )
    )
  }

  return (
    <PatientContext.Provider
      value={{
        patients,
        appointments,
        addPatient,
        updatePatient,
        addAppointment,
        updateAppointment
      }}
    >
      {children}
    </PatientContext.Provider>
  )
}