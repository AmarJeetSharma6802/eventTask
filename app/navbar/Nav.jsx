"use client"
import React, { useState } from "react";
import style from "../style/navbar.module.css";
import Image from "next/image";

function Nav() {
    const [NavOpen ,setNavOpen]  = useState(false)
  return (
    <div>
      <header className={style.header}>
        <label htmlFor="" className={style.label}>
          <Image
            src="/sydfest-horizontal.png"
            alt=""
            width={130}
            height={70}
            className={style.logo}
          />
        </label>
        <nav className={style.nav}>
          <ul className={`${style.nav_ul} ${NavOpen ? style.active: ""}`} >
            <li className={style.nav_li}>Discover</li>
            <li className={style.nav_li}>Calender</li>
            <li className={style.nav_li}>My Tikect</li>
            <li className={style.nav_li}>About</li>
            <button className={style.div_nav_btn}>Sign In</button>
          </ul>
        </nav>
        <button className={style.nav_bar_btn} onClick={()=> setNavOpen(!NavOpen)}><i className="fa-solid fa-bars"></i></button>
      </header>
    </div>
  );
}

export default Nav;
