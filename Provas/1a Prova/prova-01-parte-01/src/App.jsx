import React, { useState } from 'react';
import AppOriginal from './AppOriginal';
import AppAssignmentResolution from './AppAssignmentResolution';

const ToggleAppView = () => {
  const [view, setView] = useState(null);

  return (
    <div className="p-4">
      <div className="space-x-2 mb-4">
        <button 
          onClick={() => setView('original')} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ver App Original
        </button>
        <button 
          onClick={() => setView('assignment')} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Ver Resolução
        </button>
      </div>

      <div>
        {view === 'original' && <AppOriginal />}
        {view === 'assignment' && <AppAssignmentResolution />}
      </div>
    </div>
  );
};

export default ToggleAppView;
