import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid w-16 h-16"></div>
    </div>
  );
};

export default Spinner;
