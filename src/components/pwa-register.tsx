"use client";

import { useEffect, useState } from "react";

export function PwaRegister() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => undefined);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div
      role="status"
      style={{
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 1000,
        padding: "10px 14px",
        borderRadius: 999,
        background: "#2B2B2B",
        color: "white",
        fontSize: ".85rem",
        boxShadow: "0 4px 18px rgba(0,0,0,.16)",
      }}
    >
      Offline mode — cached pages remain available
    </div>
  );
}
