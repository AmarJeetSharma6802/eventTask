"use client";
import React from "react";
import style from "../style/home.module.css";

function HomeSectionTwo({ events }) {
  return (
    <section className={style.section}>
      <h2 className={style.heading}>Popular Events</h2>

      <div className={style.grid}>
        {events.map((event) => (
          <div key={event._id} className={style.card}>
            <img
              src={event.image}
              alt={event.title}
              className={style.image}
            />

            <div className={style.content}>
              <span className={style.category}>
                {event.category}
              </span>

              <h3 className={style.title}>
                {event.title}
              </h3>

              <button
                className={style.btn}
                onClick={() =>
                  window.location.assign(event.sourceUrl)
                }
              >
                View Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeSectionTwo;
