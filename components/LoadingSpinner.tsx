
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      <p className="mt-4 text-lg text-gray-300">Generating Your Library...</p>
    </div>
  );
};

export default LoadingSpinner;
