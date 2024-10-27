import React, { useState } from "react";

export default function Sidebar() {
  const [showSidenav, setShowSidenav] = useState(false);

  return (
    <div>
      {/* Button to show the sidebar */}
      {!showSidenav && (
        <button
          onClick={() => setShowSidenav(true)}
          className="fixed top-8 left-8 bg-slate-800 text-slate-100 rounded-full p-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}

      {/* Sidebar navigation */}
      {showSidenav && (
        <nav
          className={`fixed z-10 h-screen bg-slate-800 w-72 text-slate-100 p-8 transition-transform duration-300 ${
            showSidenav ? "translate-x-0" : "-translate-x-72"
          }`}
        >
          <button onClick={() => setShowSidenav(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
}
