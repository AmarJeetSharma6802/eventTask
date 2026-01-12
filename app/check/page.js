"use client";
import React, { useEffect, useState } from "react";

function Page() {
  const [events, setEvents] = useState([]);   // ✅ data
  const [category, setCategory] = useState("all"); // ✅ filter

  useEffect(() => {
    const fetchDt = async () => {
      const res = await fetch("/api/event");
      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      setEvents(data);
    };

    fetchDt();
  }, []);

  const filteredEvents =
    category === "all"
      ? events
      : events.filter((item) => item.category === category);

  return (
    <div>
      <ul>
        <li onClick={() => setCategory("all")}>All</li>
        <li onClick={() => setCategory("General")}>General</li>
        <li onClick={() => setCategory("Health and beauty")}>
          Health and beauty
        </li>
        <li onClick={() => setCategory("Shopping")}>Shopping</li>
        <li onClick={() => setCategory("Bars")}>Bars</li>
        <li onClick={() => setCategory("Things to do")}>Things to do</li>
      </ul>

      {filteredEvents.map((item) => (
        <div key={item._id}>
          <img src={item.image} alt={item.title} />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Page;
