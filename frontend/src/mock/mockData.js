import { addDays, addHours, subDays, setHours, setMinutes } from 'date-fns';

// Generate random date within a range
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate random time (hours and minutes)
const randomTime = () => {
  const hours = Math.floor(Math.random() * 9) + 8; // 8 AM to 5 PM
  const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)]; // 0, 15, 30, or 45 minutes
  return { hours, minutes };
};

// Generate mock patients data
export const generateMockPatients = (count) => {
  const severityLevels = [1, 2, 3, 4, 5];
  const genders = ['Masculino', 'Femenino'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const conditions = [
    'Hipertensión',
    'Diabetes Tipo 2',
    'Asma',
    'Artritis',
    'Migraña',
    'Hipotiroidismo',
    'Ansiedad',
    'Depresión',
    'EPOC',
    'Ninguna'
  ];
  
  const firstNames = [
    'María', 'Juan', 'Ana', 'Carlos', 'Sofía', 'Luis', 'Laura', 'Pedro', 'Gabriela', 
    'Miguel', 'Patricia', 'José', 'Daniela', 'Fernando', 'Carmen', 'Javier', 'Isabel',
    'Ricardo', 'Alejandra', 'Antonio'
  ];
  
  const lastNames = [
    'García', 'Rodríguez', 'López', 'Martínez', 'González', 'Pérez', 'Sánchez', 'Ramírez', 
    'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Reyes', 'Cruz', 'Morales', 'Ortiz',
    'Herrera', 'Castro', 'Vargas'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Generate a random age between 18 and 90
    const age = Math.floor(Math.random() * 72) + 18;
    
    // Generate a random set of existing conditions
    const patientConditions = [];
    const conditionCount = Math.floor(Math.random() * 3); // 0 to 2 conditions
    
    for (let j = 0; j < conditionCount; j++) {
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      if (!patientConditions.includes(condition) && condition !== 'Ninguna') {
        patientConditions.push(condition);
      }
    }
    
    if (patientConditions.length === 0) {
      patientConditions.push('Ninguna');
    }
    
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      age,
      gender: genders[Math.floor(Math.random() * genders.length)],
      bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
      conditions: patientConditions,
      severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
      registrationDate: randomDate(subDays(new Date(), 30), new Date()),
      lastVisit: randomDate(subDays(new Date(), 15), new Date()),
      contactPhone: `+56 9 ${Math.floor(Math.random() * 90000000) + 10000000}`,
      contactEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      insuranceProvider: ['Fonasa', 'Isapre', 'Particular'][Math.floor(Math.random() * 3)]
    };
  });
};

// Generate mock appointments
export const generateMockAppointments = (count) => {
  const appointmentTypes = ['Consulta', 'Control', 'Urgencia', 'Procedimiento'];
  //const statuses = ['Programada', 'En Curso', 'Completada', 'Cancelada'];
  const doctorIds = [1, 2, 3, 4, 5];
  
  return Array.from({ length: count }, (_, i) => {
    const today = new Date();
    const appointmentDate = randomDate(subDays(today, 7), addDays(today, 14));
    const { hours, minutes } = randomTime();
    
    // Set the appointment time
    const appointmentTime = setMinutes(setHours(appointmentDate, hours), minutes);
    
    // Duration between 15, 30, 45, or 60 minutes
    const duration = [15, 30, 45, 60][Math.floor(Math.random() * 4)];
    
    // End time
    const endTime = addHours(appointmentTime, duration / 60);
    
    // Determine status based on date
    let status;
    if (appointmentTime < new Date()) {
      // Past appointment
      status = Math.random() < 0.9 ? 'Completada' : 'Cancelada';
    } else {
      // Future appointment
      status = 'Programada';
    }
    
    // Random patient ID between 1 and 20
    const patientId = Math.floor(Math.random() * 20) + 1;
    
    return {
      id: i + 1,
      patientId,
      doctorId: doctorIds[Math.floor(Math.random() * doctorIds.length)],
      type: appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)],
      status,
      startTime: appointmentTime,
      endTime,
      duration,
      notes: `Notas para la cita ${i + 1}`,
      createdAt: subDays(appointmentTime, Math.floor(Math.random() * 10) + 1)
    };
  });
};