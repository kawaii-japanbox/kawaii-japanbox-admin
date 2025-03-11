import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import "../../styles/login.css";

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
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2 className="reset-password-title">Reset Password</h2>
        <p className="reset-password-subtitle">
          Please enter and confirm your new password to complete the reset
          process.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Field */}
          <div className="relative w-full">
            <input
              type={showNewPassword ? "text" : "password"}
              className={`reset-password-form-input ${
                error ? "form-input-error" : "form-input-normal"
              }`}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-button"
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
              className={`reset-password-form-input ${
                error ? "form-input-error" : "form-input-normal"
              }`}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-button"
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
          className="mt-4 submit-button"
          onClick={(e) => handleSubmit(e)}
        >
          Reset
        </button>
        {error && <p className="error-message">{error}</p>}{" "}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
