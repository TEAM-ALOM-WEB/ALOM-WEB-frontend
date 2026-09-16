"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types/faq";

export default function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `faq-answer-${item.id}`;

  return (
    <div className="rounded-2xl border border-foreground/10 bg-surface/85 backdrop-blur-md overflow-hidden transition-colors duration-300 hover:border-foreground/25">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
      >
        <span className="text-sm sm:text-base font-semibold text-foreground break-keep">
          {item.question}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`shrink-0 size-5 text-foreground/50 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={panelId}
        role="region"
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 sm:px-6 sm:pb-5 text-sm sm:text-base text-foreground/60 leading-relaxed break-keep">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
