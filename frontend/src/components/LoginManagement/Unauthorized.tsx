import { Ban } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center font-inter">
      <Ban size={48} />
      {/* <img src="/unauthorized.svg" alt="Access Denied" className="w-64 mb-4" /> */}
      <h1 className="text-2xl font-bold text-red-600">403 - Access Denied</h1>
      <p className="text-gray-700">
        You do not have permission to view this page.
      </p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
