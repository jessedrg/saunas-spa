"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// List of known bot/crawler user agents
const BOT_USER_AGENTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'sogou', 'exabot', 'facebot', 'facebookexternalhit',
  'ia_archiver', 'linkedinbot', 'twitterbot', 'pinterest', 'semrushbot',
  'ahrefsbot', 'mj12bot', 'dotbot', 'petalbot', 'bytespider',
  'applebot', 'chrome-lighthouse', 'pagespeed', 'gtmetrix', 'pingdom'
];

function isBot(): boolean {
  if (typeof window === 'undefined') return true; // SSR = assume bot
  const ua = navigator.userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

const AGE_CONTENT: Record<string, {
  title: string;
  subtitle: string;
  question: string;
  confirm: string;
  deny: string;
  warning: string;
}> = {
  en: {
    title: "Age Verification",
    subtitle: "SaunaSpa.io",
    question: "Are you 18 years of age or older?",
    confirm: "Yes, I am 18+",
    deny: "No, I am under 18",
    warning: "You must be 18 or older to enter this website."
  },
  es: {
    title: "Verificación de Edad",
    subtitle: "SaunaSpa.io",
    question: "¿Tienes 18 años o más?",
    confirm: "Sí, tengo 18+",
    deny: "No, soy menor de 18",
    warning: "Debes tener 18 años o más para entrar a este sitio."
  },
  de: {
    title: "Altersverifikation",
    subtitle: "SaunaSpa.io",
    question: "Sind Sie 18 Jahre oder älter?",
    confirm: "Ja, ich bin 18+",
    deny: "Nein, ich bin unter 18",
    warning: "Sie müssen 18 Jahre oder älter sein, um diese Website zu betreten."
  },
  fr: {
    title: "Vérification de l'âge",
    subtitle: "SaunaSpa.io",
    question: "Avez-vous 18 ans ou plus?",
    confirm: "Oui, j'ai 18+",
    deny: "Non, j'ai moins de 18 ans",
    warning: "Vous devez avoir 18 ans ou plus pour accéder à ce site."
  }
};

export function AgeVerification() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isDenied, setIsDenied] = useState(false);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    // Skip for bots/crawlers - let them index the content
    if (isBot()) {
      setIsVerified(true);
      return;
    }

    // Check if already verified
    const verified = localStorage.getItem("age-verified");
    if (verified === "true") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }

    // Detect locale from URL
    const path = window.location.pathname;
    const pathLocale = path.split("/")[1];
    if (pathLocale && AGE_CONTENT[pathLocale]) {
      setLocale(pathLocale);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("age-verified", "true");
    setIsVerified(true);
  };

  const handleDeny = () => {
    setIsDenied(true);
  };

  // Still loading
  if (isVerified === null) {
    return null;
  }

  // Already verified
  if (isVerified) {
    return null;
  }

  const content = AGE_CONTENT[locale] || AGE_CONTENT.en;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-background max-w-md w-full p-10 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <span className="text-2xl font-serif font-light tracking-wide">{content.subtitle}</span>
        </div>

        {isDenied ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 border border-red-500/50 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-muted-foreground font-light">
              {content.warning}
            </p>
          </>
        ) : (
          <>
            {/* Title */}
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
              {content.title}
            </h2>

            {/* Question */}
            <p className="text-xl font-serif font-light mb-10">
              {content.question}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleConfirm}
                className="h-14 rounded-none text-xs uppercase tracking-[0.2em] font-medium"
              >
                {content.confirm}
              </Button>
              <Button
                onClick={handleDeny}
                variant="outline"
                className="h-14 rounded-none text-xs uppercase tracking-[0.2em] font-medium border-border hover:bg-muted"
              >
                {content.deny}
              </Button>
            </div>

            {/* Legal text */}
            <p className="text-[10px] text-muted-foreground mt-8 leading-relaxed">
              By entering this site you are agreeing to our Terms of Service and Privacy Policy.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
