import { useState } from 'react'
import SeverityBadge from './SeverityBadge'
import { FiEdit, FiClock, FiInfo } from 'react-icons/fi'
import { format } from 'date-fns'

const PatientCard = ({ patient, onEdit }) => {
  const [showDetails, setShowDetails] = useState(false)

  const formattedDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy')
    } catch (e){
      return dateString
    }
  }

  const formattedDateTime = (dateTimeString) => {
    try {
      return format(new Date(dateTimeString), 'MMM d, yyyy h:mm a')
    } catch (e) {
      return dateTimeString
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-neutral-900">{patient.name}</h3>
            <p className="text-sm text-neutral-500">
              {patient.age} years • {patient.gender} • ID: {patient.id}
            </p>
          </div>
          <SeverityBadge level={patient.severity} />
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-neutral-500">Room:</span> {patient.room}
          </div>
          <div>
            <span className="text-neutral-500">Doctor:</span> {patient.doctor}
          </div>
        </div>

        <div className="mt-2">
          <div className="text-sm">
            <span className="text-neutral-500">Condition:</span> {patient.condition}
          </div>
          <div className="flex items-center mt-1 text-xs text-neutral-500">
            <FiClock className="mr-1" />
            <span>Admitted: {formattedDate(patient.admissionDate)}</span>
          </div>
        </div>

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-neutral-200 animate-fade-in">
            <p className="text-sm text-neutral-700">{patient.notes}</p>
            <p className="mt-2 text-xs text-neutral-500">
              Last updated: {formattedDateTime(patient.lastUpdated)}
            </p>
          </div>
        )}
      </div>

      <div className="bg-neutral-50 px-4 py-2 flex justify-between border-t border-neutral-200">
        <button
          className="text-xs flex items-center text-neutral-600 hover:text-primary-600"
          onClick={() => setShowDetails(!showDetails)}
        >
          <FiInfo className="mr-1" />
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        <button
          className="text-xs flex items-center text-neutral-600 hover:text-primary-600"
          onClick={() => onEdit(patient)}
        >
          <FiEdit className="mr-1" />
          Edit
        </button>
      </div>
    </div>
  )
}

export default PatientCard