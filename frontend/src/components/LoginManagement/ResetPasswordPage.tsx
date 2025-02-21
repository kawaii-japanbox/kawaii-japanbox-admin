import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = sessionStorage.getItem("resetEmail") || "";
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await resetPassword({ email, newPassword: newPassword });
      console.log("Password successfully reset");
      navigate("/login");
    } catch (error) {
      console.error("Reset password failed:", error);
      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 font-inter">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter and confirm your new password to complete the reset
          process.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Field */}
          <div className="relative w-full">
            <input
              type={showNewPassword ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? (
                <EyeOffIcon size={20} />
              ) : (
                <EyeIcon size={20} />
              )}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={20} />
              ) : (
                <EyeIcon size={20} />
              )}
            </button>
          </div>
        </form>
        <button
          type="submit"
          className="w-full bg-blue-500 mt-4 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={(e) => handleSubmit(e)}
        >
          Reset
        </button>
        {error && (
          <p className="text-red-600 p-2 rounded mt-4 text-center max-w-full break-words whitespace-pre-line">
            {error}
          </p>
        )}{" "}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
