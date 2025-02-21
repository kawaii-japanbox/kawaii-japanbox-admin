import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      sessionStorage.setItem("resetEmail", email);
      navigate("/verification");
    } catch (error) {
      console.error("Forgot password failed:", error);
      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };
        setError(axiosError.response?.data?.error || "Something went wrong");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password?
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-inter py-2 rounded-lg transition duration-200"
          >
            Reset password
          </button>
          <Link to="/forgot-password">
            <p className="text-sm text-center text-blue-600 mt-4 hover:underline hover:text-blue-600 transition">
              Go back to Login
            </p>
          </Link>
          {error && (
            <p className="text-red-600 p-2 rounded mt-4 text-center max-w-full break-words whitespace-pre-line">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
