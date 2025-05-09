import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading,setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value) || value.length > 1) return;
    
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      let newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyDownforsubmit = (event) => {
    if (event.key === "Enter" && otp.every((num) => num !== "")) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const otpCode = otp.join("");
      const response = await axios.post("http://localhost:4000/api/auth/emailverify", { code: otpCode });
      alert(response?.data?.message || "User registered successfully.");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div onKeyDown={handleKeyDownforsubmit} className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="border border-gray-300 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="font-mono font-semibold text-2xl mb-4 text-center">Verify Email</h1>
        <p className="text-gray-600 text-sm mb-4">Enter the 6-digit code sent to your email</p>
        <div className="flex space-x-2">
          {otp.map((data, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={data}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              className="w-12 h-12 text-center text-xl border border-gray-400 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          {loading?"verifying.........":"Submit"}
        </button>
      </div>
    </div>
  );
}

export default OTP;
