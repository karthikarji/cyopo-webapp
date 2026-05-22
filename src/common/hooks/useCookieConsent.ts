import { useState, useEffect } from "react";

const CONSENT_KEY = "cyopo_cookie_consent";

type ConsentState = "accepted" | "declined" | null;

const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "declined") {
      setConsent(saved);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
  };

  return {
    consent, // 'accepted' | 'declined' | null
    hasResponded: consent !== null, // banner should hide
    isAccepted: consent === "accepted",
    accept,
    decline,
  };
};

export default useCookieConsent;
