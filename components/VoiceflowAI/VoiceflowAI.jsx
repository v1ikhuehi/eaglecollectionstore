"use client";

import { useEffect } from "react";

const VoiceflowAI = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: "65be9e23b1559696681bce65" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
      });
    };
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.type = "text/javascript";
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default VoiceflowAI;
