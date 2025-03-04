import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid w-12 h-12" />
    </div>
  );
};

export default Spinner;
