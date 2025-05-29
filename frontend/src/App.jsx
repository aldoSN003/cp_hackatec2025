
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CalendarView from './views/CalendarView';
import PatientGridView from './views/PatientGridView';
import VoiceAssistant from './views/VoiceAssistant';
import { AppProvider } from './context/AppContext';
import { PatientProvider } from './context/PatientContext'
import './App.css';

//<Route path="/patients" element={<PatientGridView />} />

function App() {
  return (
      <PatientProvider>
        <AppProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/calendar" replace />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/patients" element={<PatientGridView />} />
              <Route path="/assistant" element={<VoiceAssistant />} />
              </Route>
            </Routes>
          </Router>
        </AppProvider>
      </PatientProvider>
  );
}

export default App;