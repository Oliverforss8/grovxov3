"use client";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [time, setTime] = useState<string>("");

  const updateTime = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Europe/Stockholm",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    setTime(date.toLocaleTimeString([], options));
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-white grid-container absolute w-full mt-4">
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row align-middles items-center gap-4">
          <h3 className="text-[20px] font-bold">Take action</h3>
          <button
            className="border-[3px] font-bold text-[20px] border-[#FFD626] rounded-xl px-3"
            onClick={() => (window.location.href = "mailto:robin@grovxo.com")}
          >
            CONTACT
          </button>
        </div>
        <div className="text-[24px] font-bold text-[#FFD626]">VXO {time}</div>
      </div>
    </div>
  );
};

export default Header;
