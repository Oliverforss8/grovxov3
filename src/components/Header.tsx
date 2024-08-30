"use client";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [time, setTime] = useState<string>("");
  const [isFormVisible, setFormVisible] = useState<boolean>(false); // State to manage form visibility
  const [isScriptLoaded, setScriptLoaded] = useState<boolean>(false); // State to check if the script is loaded

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

  // Load Paperform script only once
  useEffect(() => {
    const scriptId = "paperform-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://paperform.co/__embed.min.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true); // Set script loaded to true when the script loads
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true); // If the script is already present, set it to loaded
    }
  }, []);

  // Function to handle opening the form
  const handleOpenForm = () => {
    if (isScriptLoaded) {
      setFormVisible(true); // Set state to true to show the form
    } else {
      console.error("Paperform script not loaded yet");
    }
  };

  // Function to handle closing the form
  const handleCloseForm = () => {
    setFormVisible(false); // Set state to false to hide the form
  };

  return (
    <div className="text-white flex w-full mt-4 grid-container">
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row align-middle items-center gap-4">
          <h3 className="text-[16px] md:text-[20px] font-bold">
            Take action &gt;
          </h3>
          <div onClick={handleOpenForm} className="z-[99]">
            <button className="border-[3px] font-bold text-[16px] md:text-[20px] border-[#FFD626] rounded-xl px-3">
              <p>Contact</p>
            </button>
          </div>
        </div>
        <div className="text-[16px] md:text-[24px] font-bold text-[#FFD626]">
          VXO {time}
        </div>
      </div>

      {/* Fullscreen Form Overlay */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-xl p-6 w-[90vw] md:w-[60vw] lg:w-[40vw] relative max-h-[80vh] overflow-y-auto">
            {/* Enhanced Close Button */}
            <button
              className="absolute top-4 right-4 bg-[#FFD626] text-black rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-yellow-500 shadow-md transition-all duration-200 ease-in-out z-[99999]"
              onClick={handleCloseForm}
            >
              &times;
            </button>
            {/* Scrollable Content Container */}
            <div className="overflow-y-auto max-h-[70vh]">
              {/* Paperform Embed */}
              <div data-paperform-id="giosjmtk"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
