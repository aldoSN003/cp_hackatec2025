
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CalendarView from './views/CalendarView';
//import PatientGridView from './views/PatientGridView';
import VoiceAssistant from './views/VoiceAssistant';
import { AppProvider } from './context/AppContext';
import './App.css';

//<Route path="/patients" element={<PatientGridView />} />

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/assistant" replace />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/assistant" element={<VoiceAssistant />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;