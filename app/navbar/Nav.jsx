"use client";

import React, { useState } from "react";
import style from "../style/navbar.module.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

function Nav() {
  const [NavOpen, setNavOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/controller/logoutGetData", {
      method: "POST",
      credentials: "include",
    });

    router.push("/");
  };

  const hideLogout = pathname === "/";

  return (
    <header className={style.header}>
      <label className={style.label}>
        <Image
          src="/sydfest-horizontal.png"
          alt="logo"
          width={130}
          height={70}
          className={style.logo}
        />
      </label>

      <nav className={style.nav}>
        <ul className={`${style.nav_ul} ${NavOpen ? style.active : ""}`}>
          <li className={style.nav_li}>Discover</li>
          <li className={style.nav_li}>Calendar</li>
          <li className={style.nav_li}>My Ticket</li>
          <li className={style.nav_li}>About</li>
        </ul>
      </nav>

      {!hideLogout && (
        <button className={style.div_nav_btn} onClick={handleLogout}>
          Logout
        </button>
      )}

      <button
        className={style.nav_bar_btn}
        onClick={() => setNavOpen(!NavOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
    </header>
  );
}

export default Nav;
