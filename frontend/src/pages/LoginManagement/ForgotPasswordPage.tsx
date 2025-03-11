import { useState } from "react";
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
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">Forgot Password?</h2>
        <p className="forgot-password-subtitle">
          Enter your email to receive a password reset code.
        </p>
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className={`forgot-password-form-input ${
              error ? "form-input-error" : "form-input-normal "
            }`}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-password-submit-button">
            Reset password
          </button>
          <Link to="/login">
            <p className="back-to-login-link">Go back to Login</p>
          </Link>
          {error && <p className="forgot-password-error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
