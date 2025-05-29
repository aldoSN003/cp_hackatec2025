import React from 'react';
import Navbar from './components/layout/Navbar';
import PatientConsultation from './pages/PatientConsultation';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PatientConsultation />
    </div>
  );
}

export default App;