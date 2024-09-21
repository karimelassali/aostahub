"use client";;
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(({
  card,
  index,
  hovered,
  setHovered
}) => (
  <div
  style={{cursor:'pointer'}}
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-gray-100 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}>
    <Image
    style={{borderRadius:'5px'}}
      src={card.src}
      alt={card.title}
      fill
      className="object-cover absolute inset-0 rounded-md" />
    <div
    style={{borderRadius:'5px'}}
      className={cn(
        "absolute inset-0  flex items-end py-8 px-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-0"
      )}>
      <div
      style={{
        backdropFilter:'blur(40px)',
        padding:'1rem',
        borderRadius:'9px',
        cursor:'pointer',

      }}
        className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
        {card.title}
      </div>
    </div>
  </div>
));

Card.displayName = "Card";

export function FocusCards({
  cards
}) {
  const [hovered, setHovered] = useState(null);

  return (
    (<div
      style={{borderRadius:'5px'}}
      className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full max-sm:p-2 max-md:p-2 ">
      {cards.map((card, index) => (
        <Card
          
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered} />
      ))}
    </div>)
  );
}
