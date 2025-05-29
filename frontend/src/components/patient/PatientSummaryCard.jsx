import React from 'react';

const PatientSummaryCard = ({
                                  assignedDoctor,
                                  assignedEquipment,
                                  assignedRoom,
                                  notes,
                                  patientId,
                                  possibleConditions,
                                  recommendedTests,
                                  urgencyLevel
                                }) => {

  return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">{patientId}</h3>
            <span className="text-sm px-2.5 py-1 rounded-full">
            {urgencyLevel}
          </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Posibles Condiciones</h4>
            <div className="flex flex-wrap gap-2">
              {possibleConditions.map((condition, index) => (
                  <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-sm"
                  >
                {condition}
              </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Habitación Asignada</h4>
              <p className="text-gray-800 font-medium">{assignedRoom}</p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Doctor Asignado</h4>
              <p className="text-gray-800 font-medium">{assignedDoctor}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Equipo Asignado</h4>
            <div className="flex flex-wrap gap-2">
              {assignedEquipment.map((equipment, index) => (
                  <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-sm"
                  >
                {equipment}
              </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Pruebas Recomendadas</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {recommendedTests.map((test, index) => (
                  <li key={index}>{test}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Notas</h4>
            <p className="text-gray-700">{notes}</p>
          </div>
        </div>
      </div>
  );
};

export default PatientSummaryCard;
