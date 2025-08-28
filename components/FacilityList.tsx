
import React from 'react';
import type { Facility } from '../types';

interface FacilityListProps {
  facilities: Facility[];
  onSelectFacility: (facility: Facility) => void;
  selectedFacility: Facility | null;
}

const FacilityList: React.FC<FacilityListProps> = ({ facilities, onSelectFacility, selectedFacility }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow h-full">
      <h2 className="text-lg font-bold mb-3 text-slate-700 border-b pb-2">시설 목록</h2>
      <ul className="space-y-2 max-h-96 overflow-y-auto">
        {facilities.map((facility) => (
          <li key={facility.id}>
            <button
              onClick={() => onSelectFacility(facility)}
              className={`
                w-full text-left p-3 rounded-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
                ${selectedFacility?.id === facility.id 
                  ? 'bg-blue-100 text-blue-800 font-semibold shadow-inner' 
                  : 'hover:bg-slate-100 hover:text-slate-900'}
              `}
            >
              {facility.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacilityList;
