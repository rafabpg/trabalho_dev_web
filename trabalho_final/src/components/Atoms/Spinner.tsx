import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.5-1.5a1 1 0 111.414 1.414L6.414 20.414A1 1 0 014 21H0v-4a1 1 0 011.707-.707l1.586 1.586A.997.997 0 016 17.291z"></path>
      </svg>
    </div>
  );
};

export default Spinner;
