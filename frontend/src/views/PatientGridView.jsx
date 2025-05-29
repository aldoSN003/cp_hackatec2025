import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiFilter, FiX } from 'react-icons/fi'
import { usePatients } from '../context/PatientContext'
import PatientCard from '../components/PatientCard'

const PatientGridView = () => {
  const { patients, addPatient, updatePatient } = usePatients()
  const [filteredPatients, setFilteredPatients] = useState(patients)
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('')
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [isEditingPatient, setIsEditingPatient] = useState(false)
  const [currentPatient, setCurrentPatient] = useState({
    name: '',
    age: '',
    gender: 'Male',
    room: '',
    doctor: '',
    severity: 1,
    condition: '',
    notes: '',
    admissionDate: new Date().toISOString().slice(0, 10)
  })

  useEffect(() => {
    let result = patients

    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase()
      result = result.filter(
        patient =>
          patient.name.toLowerCase().includes(lowerSearchTerm) ||
          patient.id.toLowerCase().includes(lowerSearchTerm) ||
          patient.condition.toLowerCase().includes(lowerSearchTerm)
      )
    }

    // Apply severity filter
    if (severityFilter) {
      result = result.filter(patient => patient.severity === parseInt(severityFilter))
    }

    setFilteredPatients(result)
  }, [patients, searchTerm, severityFilter])

  const handleAddPatient = () => {
    const newPatient = {
      ...currentPatient,
      id: `P${Math.floor(1000 + Math.random() * 9000)}`,
      lastUpdated: new Date().toISOString()
    }
    addPatient(newPatient)
    setIsAddingPatient(false)
    setCurrentPatient({
      name: '',
      age: '',
      gender: 'Male',
      room: '',
      doctor: '',
      severity: 1,
      condition: '',
      notes: '',
      admissionDate: new Date().toISOString().slice(0, 10)
    })
  }

  const handleEditPatient = () => {
    updatePatient(currentPatient.id, {
      ...currentPatient,
      lastUpdated: new Date().toISOString()
    })
    setIsEditingPatient(false)
  }

  const openEditModal = (patient) => {
    setCurrentPatient(patient)
    setIsEditingPatient(true)
  }

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4 md:mb-0">Patient Management</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="h-5 w-5 text-neutral-400" />
            </div>
            <select
              className="pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="">All severity levels</option>
              <option value="1">Level 1 - Low</option>
              <option value="2">Level 2 - Guarded</option>
              <option value="3">Level 3 - Moderate</option>
              <option value="4">Level 4 - Serious</option>
              <option value="5">Level 5 - Critical</option>
            </select>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={() => setIsAddingPatient(true)}
          >
            <FiPlus className="mr-2 -ml-1 h-5 w-5" />
            Add Patient
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} onEdit={openEditModal} />
          ))
        ) : (
          <div className="col-span-full p-6 text-center">
            <p className="text-neutral-500">No patients found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {isAddingPatient && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsAddingPatient(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-neutral-900" id="modal-title">
                        Add New Patient
                      </h3>
                      <button
                        type="button"
                        className="bg-white rounded-md text-neutral-400 hover:text-neutral-500 focus:outline-none"
                        onClick={() => setIsAddingPatient(false)}
                      >
                        <span className="sr-only">Close</span>
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                            value={currentPatient.name}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="age" className="block text-sm font-medium text-neutral-700">
                            Age
                          </label>
                          <input
                            type="number"
                            name="age"
                            id="age"
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                            value={currentPatient.age}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, age: parseInt(e.target.value) || '' })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium text-neutral-700">
                            Gender
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            value={currentPatient.gender}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, gender: e.target.value })}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="severity" className="block text-sm font-medium text-neutral-700">
                            Severity Level
                          </label>
                          <select
                            id="severity"
                            name="severity"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            value={currentPatient.severity}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, severity: parseInt(e.target.value) })}
                          >
                            <option value={1}>Level 1 - Low</option>
                            <option value={2}>Level 2 - Guarded</option>
                            <option value={3}>Level 3 - Moderate</option>
                            <option value={4}>Level 4 - Serious</option>
                            <option value={5}>Level 5 - Critical</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="room" className="block text-sm font-medium text-neutral-700">
                            Room
                          </label>
                          <input
                            type="text"
                            name="room"
                            id="room"
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                            value={currentPatient.room}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, room: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="doctor" className="block text-sm font-medium text-neutral-700">
                            Doctor
                          </label>
                          <input
                            type="text"
                            name="doctor"
                            id="doctor"
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                            value={currentPatient.doctor}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, doctor: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="condition" className="block text-sm font-medium text-neutral-700">
                          Condition/Diagnosis
                        </label>
                        <input
                          type="text"
                          name="condition"
                          id="condition"
                          className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                          value={currentPatient.condition}
                          onChange={(e) => setCurrentPatient({ ...currentPatient, condition: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-neutral-700">
                          Clinical Notes
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                          value={currentPatient.notes}
                          onChange={(e) => setCurrentPatient({ ...currentPatient, notes: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="admission-date" className="block text-sm font-medium text-neutral-700">
                          Admission Date
                        </label>
                        <input
                          type="date"
                          name="admission-date"
                          id="admission-date"
                          className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                          value={currentPatient.admissionDate}
                          onChange={(e) => setCurrentPatient({ ...currentPatient, admissionDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddPatient}
                >
                  Add Patient
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsAddingPatient(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {isEditingPatient && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-opacity-50" aria-hidden="true" onClick={() => setIsEditingPatient(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-neutral-900" id="modal-title">
                        Edit Patient - {currentPatient.id}
                      </h3>
                      <button
                        type="button"
                        className="bg-white rounded-md text-neutral-400 hover:text-neutral-500 focus:outline-none"
                        onClick={() => setIsEditingPatient(false)}
                      >
                        <span className="sr-only">Close</span>
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="edit-name" className="block text-sm font-medium text-neutral-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="edit-name"
                            id="edit-name"
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                            value={currentPatient.name}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="edit-age" className="block text-sm font-medium text-neutral-700">
                            Age
                          </label>
                          <input
                            type="number"
                            name="edit-age"
                            id="edit-age"
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                            value={currentPatient.age}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, age: parseInt(e.target.value) || '' })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="edit-gender" className="block text-sm font-medium text-neutral-700">
                            Gender
                          </label>
                          <select
                            id="edit-gender"
                            name="edit-gender"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            value={currentPatient.gender}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, gender: e.target.value })}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="edit-severity" className="block text-sm font-medium text-neutral-700">
                            Severity Level
                          </label>
                          <select
                            id="edit-severity"
                            name="edit-severity"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            value={currentPatient.severity}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, severity: parseInt(e.target.value) })}
                          >
                            <option value={1}>Level 1 - Low</option>
                            <option value={2}>Level 2 - Guarded</option>
                            <option value={3}>Level 3 - Moderate</option>
                            <option value={4}>Level 4 - Serious</option>
                            <option value={5}>Level 5 - Critical</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="edit-room" className="block text-sm font-medium text-neutral-700">
                            Room
                          </label>
                          <input
                            type="text"
                            name="edit-room"
                            id="edit-room"
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                            value={currentPatient.room}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, room: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="edit-doctor" className="block text-sm font-medium text-neutral-700">
                            Doctor
                          </label>
                          <input
                            type="text"
                            name="edit-doctor"
                            id="edit-doctor"
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                            value={currentPatient.doctor}
                            onChange={(e) => setCurrentPatient({ ...currentPatient, doctor: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="edit-condition" className="block text-sm font-medium text-neutral-700">
                          Condition/Diagnosis
                        </label>
                        <input
                          type="text"
                          name="edit-condition"
                          id="edit-condition"
                          className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                          value={currentPatient.condition}
                          onChange={(e) => setCurrentPatient({ ...currentPatient, condition: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-notes" className="block text-sm font-medium text-neutral-700">
                          Clinical Notes
                        </label>
                        <textarea
                          id="edit-notes"
                          name="edit-notes"
                          rows={3}
                          className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md"
                          value={currentPatient.notes}
                          onChange={(e) => setCurrentPatient({ ...currentPatient, notes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleEditPatient}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsEditingPatient(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientGridView