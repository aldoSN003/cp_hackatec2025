import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Calendar, Users, Mic, Activity, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function Layout() {
  const location = useLocation();
  const { patients } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Count patients by severity
  const severityCounts = patients.reduce((acc, patient) => {
    acc[patient.severity] = (acc[patient.severity] || 0) + 1;
    return acc;
  }, {});
  
  // Get current view title
  const getViewTitle = () => {
    switch (location.pathname) {
      case '/calendar':
        return 'Calendario de Citas';
      case '/patients':
        return 'Gestión de Pacientes';
      case '/assistant':
        return 'Asistente de Voz';
      default:
        return 'Plataforma Médica';
    }
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-center">

            <img className='w-25' src="img.png" alt="" />
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <NavLink 
                to="/calendar" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Calendar className="mr-3 h-5 w-5" />
                Calendario
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/patients" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Users className="mr-3 h-5 w-5" />
                Pacientes
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/assistant" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Mic className="mr-3 h-5 w-5" />
                Asistente de Voz
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-primary-50 rounded-lg p-3">
            <h3 className="text-sm font-medium text-primary-800 mb-2">Estado de Pacientes</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(level => (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 severity-${level}`}></span>
                    <span className="text-xs text-gray-600">Nivel {level}</span>
                  </div>
                  <span className="text-xs font-medium">{severityCounts[level] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-primary-600 mr-2" />
            <h1 className="text-lg font-semibold text-gray-900">MediCare</h1>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="px-4 pb-4 bg-white">
            <ul className="space-y-1">
              <li>
                <NavLink 
                  to="/calendar" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  Calendario
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/patients" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Pacientes
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/assistant" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mic className="mr-3 h-5 w-5" />
                  Asistente de Voz
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="md:py-6 md:px-8 p-4 mt-16 md:mt-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">{getViewTitle()}</h1>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;