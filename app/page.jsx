"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();

  const [step, setStep] = useState("register"); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/controller/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return setMessage(data.message || "Failed");

    setMessage("OTP sent to email");
    setStep("otp");
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/controller/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "verify_otp",
        email: form.email,
        otp: form.otp,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return setMessage(data.message || "OTP failed");

    router.push("/Home");
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/controller/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return setMessage(data.message || "Login failed");

    router.push("/Home");
  };

  return (
    <div className="authBox">
      <h2>
        {step === "register" && "Register"}
        {step === "otp" && "Verify OTP"}
        {step === "login" && "Login"}
      </h2>

      {message && <p className="error">{message}</p>}

      {step === "register" && (
        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button disabled={loading}>
            {loading ? "Sending OTP..." : "Register"}
          </button>

          <p onClick={() => setStep("login")} className="link">
            Already registered? Login
          </p>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOtp}>
          <input
            name="otp"
            placeholder="Enter OTP"
            onChange={handleChange}
            required
          />

          <button disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {step === "login" && (
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p onClick={() => setStep("register")} className="link">
            New user? Register
          </p>
        </form>
      )}
    </div>
  );
}
