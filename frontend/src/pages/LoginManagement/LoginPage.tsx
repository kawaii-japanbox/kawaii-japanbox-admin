import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import "../../styles/login.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { loginUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password, rememberMe);
    } catch (err: unknown) {
      console.error("Login failed:", err);
      if (err instanceof Error) {
        console.log(err);
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form action="submit" method="POST" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="login-form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              className="login-form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="login-form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              className="login-form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="remember-checkbox-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              id="remember"
              name="remember"
              className="remember-checkbox"
            />
            <label htmlFor="remember" className="remember-checkbox-label">
              Remember me
            </label>
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>

          <Link to="/forgot-password">
            <p className="forgot-password-link">Forgot your password?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
