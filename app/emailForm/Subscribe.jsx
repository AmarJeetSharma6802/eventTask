"use client";
import React, { useState } from "react";
import style from "../style/home.module.css";

function Subscribe({ eventUrl, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        eventUrl, 
      }),
    });

     if (!res.ok) {
      throw new Error("API failed");
    }

    const data = await res.json();

   if (data.redirect) {
      window.location.assign(data.redirect);
    }

    setLoading(false);
  };

  return (
    <div className={style.modal}>
      <h2>Get Tickets</h2>
      <p>Enter your email to continue to the official ticket website.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Redirecting..." : "Continue"}
        </button>
      </form>

      <span className={style.close} onClick={onClose}>
        ✕
      </span>
    </div>
  );
}

export default Subscribe;
