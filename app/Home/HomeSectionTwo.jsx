"use client";
import React, { useState } from "react";
import style from "../style/home.module.css";

function HomeSectionTwo({ events ,onGetTickets}) {
const [filterEvents ,setFilterEvents] = useState()


  

  return (
    <div>

      <section className={style.section}>
      <div className={style.heading_filter}>
      <h2 className={style.heading}>Popular Events</h2>
      <div></div>
      </div>

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
                 onClick={() => onGetTickets(event.sourceUrl)}
              >
                View Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}

export default HomeSectionTwo;
