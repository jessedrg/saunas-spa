"use client";

import { MessageCircle } from "lucide-react";
import { openIntercomChat } from "@/components/intercom";

interface IntercomButtonProps {
  text: string;
  className?: string;
}

export function IntercomButton({ text, className = "" }: IntercomButtonProps) {
  return (
    <button 
      onClick={() => openIntercomChat()}
      className={`inline-flex items-center justify-center gap-2 ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      {text}
    </button>
  );
}
