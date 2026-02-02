"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Intercom: any;
    intercomSettings: any;
  }
}

const APP_ID = "m3xcf5mh";

export function IntercomProvider() {
  useEffect(() => {
    // Load Intercom script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://widget.intercom.io/widget/${APP_ID}`;
    document.body.appendChild(script);

    // Initialize Intercom
    window.intercomSettings = {
      api_base: "https://api-iam.intercom.io",
      app_id: APP_ID,
    };

    script.onload = () => {
      if (window.Intercom) {
        window.Intercom("boot", {
          app_id: APP_ID,
        });
      }
    };

    return () => {
      if (window.Intercom) {
        window.Intercom("shutdown");
      }
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

// Function to open Intercom chat programmatically
export function openIntercomChat() {
  if (typeof window !== "undefined" && window.Intercom) {
    window.Intercom("show");
  }
}
