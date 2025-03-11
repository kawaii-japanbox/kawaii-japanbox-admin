import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/api";
import "../../styles/login.css";

const VerificationCodePage: React.FC = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("resetEmail") || "";
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pasted)) {
      setCode(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const verificationCode = code.join("");
    console.log("Submitted Code:", verificationCode);
    try {
      await verifyOtp({
        otp: verificationCode,
        action: "RESETPASSWORD",
        email,
      });
      navigate("/reset-password");
    } catch (error: unknown) {
      console.error("Verification code submit failed:", error);
      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-box">
        <h2 className="verification-title">Verification Code</h2>
        <p className="verification-subtitle ">
          We have sent a verification code to your email. Please check your
          email and enter the code
        </p>
        <div className="code-input-container" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el!;
              }}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`code-input ${
                error ? "code-input-error" : "code-input-normal"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`submit-button mt-4 ${
            loading ? "submit-button-loading" : "submit-button-normal"
          }`}
        >
          {loading ? (
            <svg
              className="verification-spinner"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Confirm"
          )}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default VerificationCodePage;
