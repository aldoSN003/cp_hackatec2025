import React from 'react';

const PatientSummaryCard = ({
  summary,
  patientName,
}) => {
  const urgencyColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{patientName}</h3>
          <span className={`text-sm px-2.5 py-1 rounded-full ${urgencyColors[summary.urgencyLevel]}`}>
            {summary.urgencyLevel.charAt(0).toUpperCase() + summary.urgencyLevel.slice(1)} Priority
          </span>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Possible Conditions</h4>
          <div className="flex flex-wrap gap-2">
            {summary.possibleConditions.map((condition, index) => (
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
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Assigned Room</h4>
            <p className="text-gray-800 font-medium">{summary.assignedRoom}</p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Assigned Doctor</h4>
            <p className="text-gray-800 font-medium">{summary.assignedDoctor}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Assigned Equipment</h4>
          <div className="flex flex-wrap gap-2">
            {summary.assignedEquipment.map((equipment, index) => (
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
          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Recommended Tests</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {summary.recommendedTests.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Notes</h4>
          <p className="text-gray-700">{summary.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientSummaryCard;
