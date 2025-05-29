import React from 'react'

const severityLabels = {
  1: 'Low',
  2: 'Guarded',
  3: 'Moderate',
  4: 'Serious',
  5: 'Critical'
}

const severityColors = {
  1: 'bg-green-100 text-green-800 border-green-300',
  2: 'bg-blue-100 text-blue-800 border-blue-300',
  3: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  4: 'bg-orange-100 text-orange-800 border-orange-300',
  5: 'bg-red-100 text-red-800 border-red-300'
}

const SeverityBadge = ({ level }) => {
  const validLevel = Math.min(Math.max(parseInt(level) || 1, 1), 5)
  
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${severityColors[validLevel]}`}
    >
      {severityLabels[validLevel]}
    </span>
  )
}

export default SeverityBadge