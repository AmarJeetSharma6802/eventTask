"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Subscribe from "../emailForm/Subscribe.jsx";
import HomeSectionTwo from "./HomeSectionTwo.jsx";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function EventSwiper() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEventUrl, setSelectedEventUrl] = useState(null);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/event");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (!progressCircle.current || !progressContent.current) return;

    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  if (loading) return <p style={{ color: "#090606",minHeight:"100vh" }} className="loading_p"><img src="/sydfest-horizontal.png" alt="" className="loading_img"/></p>;

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="heroSwiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event._id}>
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${event.image})` }}
            />

            <div className="slide-content">
              <div className="slide-image">
                <img src={event.image} alt={event.title} />
              </div>

              <div className="slide-text">
                <span className="category">{event.category}</span>
                <h2>{event.title}</h2>

                <button onClick={() => setSelectedEventUrl(event.sourceUrl)}>
                  Get Tickets
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>

      <HomeSectionTwo
        events={events}
        onGetTickets={(el) => setSelectedEventUrl(el)} 
      />

      {selectedEventUrl && (
        <Subscribe
          eventUrl={selectedEventUrl}
          onClose={() => setSelectedEventUrl(null)}
        />
      )}
    </>
  );
}
