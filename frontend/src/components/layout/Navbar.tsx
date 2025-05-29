import React from 'react';
import { Stethoscope, User, Bell, Menu } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { mockUsers } from '../../mock/data';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">MediVoice</span>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#"
                className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Appointments
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Medical Records
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Messages
              </a>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <Avatar src={mockUsers[0].avatar} alt={mockUsers[0].name} size="sm" />
              <span className="text-sm font-medium text-gray-700">{mockUsers[0].name}</span>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;