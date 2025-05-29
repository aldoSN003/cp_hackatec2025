import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function CalendarView() {
  const { appointments, doctors, patients } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  //const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeekDays(currentDate));
  
  // Update week days when current date changes
  useEffect(() => {
    setCurrentWeek(getWeekDays(currentDate));
  }, [currentDate]);
  
  // Get week days starting from the given date
  function getWeekDays(date) {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Start from Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }
  
  // Navigate to previous week
  const gotoPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };
  
  // Navigate to next week
  const gotoNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };
  
  // Get appointments for a specific day
  const getDayAppointments = (day) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.startTime);
      return isSameDay(appointmentDate, day);
    });
  };
  
  // Get patient by ID
  const getPatient = (patientId) => {
    return patients.find(patient => patient.id === patientId);
  };
  
  // Get doctor by ID
  const getDoctor = (doctorId) => {
    return doctors.find(doctor => doctor.id === doctorId);
  };
  
  // Format appointment time
  const formatAppointmentTime = (time) => {
    return format(new Date(time), 'HH:mm');
  };
  
  // Generate time slots from 8:00 to 18:00
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Calendar header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy', { locale: es })}
          </h2>
          <p className="text-sm text-gray-500">
            Semana del {format(currentWeek[0], 'd', { locale: es })} al {format(currentWeek[6], 'd', { locale: es })}
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={gotoPreviousWeek}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 rounded-md text-sm bg-primary-50 text-primary-700 hover:bg-primary-100"
          >
            Hoy
          </button>
          <button 
            onClick={gotoNextWeek}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        {/* Time column */}
        <div className="border-r border-gray-200">
          <div className="h-12 border-b border-gray-200"></div>
          {timeSlots.map(hour => (
            <div key={hour} className="h-20 border-b border-gray-200 text-xs text-gray-500 text-center pt-1">
              {`${hour}:00`}
            </div>
          ))}
        </div>
        
        {/* Day columns */}
        {currentWeek.map((day, dayIndex) => {
          const dayAppointments = getDayAppointments(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div key={dayIndex} className="border-r border-gray-200 last:border-r-0">
              {/* Day header */}
              <div 
                className={`h-12 border-b border-gray-200 text-center py-2 ${
                  isToday ? 'bg-primary-50' : ''
                }`}
              >
                <p className="text-sm font-medium text-gray-900">
                  {format(day, 'EEE', { locale: es })}
                </p>
                <p className={`text-sm ${isToday ? 'text-primary-700 font-semibold' : 'text-gray-500'}`}>
                  {format(day, 'd', { locale: es })}
                </p>
              </div>
              
              {/* Time slots */}
              {timeSlots.map(hour => {
                // Filter appointments for this hour
                const hourAppointments = dayAppointments.filter(appointment => {
                  const appointmentHour = new Date(appointment.startTime).getHours();
                  return appointmentHour === hour;
                });
                
                return (
                  <div key={hour} className="h-20 border-b border-gray-200 relative p-1">
                    {hourAppointments.map((appointment, index) => {
                      const patient = getPatient(appointment.patientId);
                      const doctor = getDoctor(appointment.doctorId);
                      
                      // Skip if patient or doctor not found
                      if (!patient || !doctor) return null;
                      
                      // Calculate appointment styles based on severity and status
                      let statusColor = 'bg-gray-100';
                      
                      switch (appointment.status) {
                        case 'Programada':
                          statusColor = `bg-${doctor.color.substring(1)} bg-opacity-10 border-l-4 border-${doctor.color.substring(1)}`;
                          break;
                        case 'En Curso':
                          statusColor = 'bg-blue-100 border-l-4 border-blue-500';
                          break;
                        case 'Completada':
                          statusColor = 'bg-green-100 border-l-4 border-green-500';
                          break;
                        case 'Cancelada':
                          statusColor = 'bg-red-100 border-l-4 border-red-500';
                          break;
                      }
                      
                      return (
                        <div 
                          key={appointment.id}
                          className={`absolute rounded-md p-2 text-xs ${statusColor}`}
                          style={{
                            top: `${(index * 20)}%`,
                            left: '2%',
                            right: '2%',
                            height: '90%',
                            zIndex: index + 1
                          }}
                        >
                          <div className="flex justify-between">
                            <span className="font-medium truncate">
                              {patient.name}
                            </span>
                            <span>
                              {formatAppointmentTime(appointment.startTime)}
                            </span>
                          </div>
                          <div className="mt-1 truncate">
                            <span className={`inline-block w-2 h-2 rounded-full mr-1 severity-${patient.severity}`}></span>
                            {appointment.type}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      
      {/* Add appointment button */}
      <div className="p-4 flex justify-end">
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Añadir Cita
        </button>
      </div>
    </div>
  );
}

export default CalendarView;