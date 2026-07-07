"use client"

import { useEffect, useState, type CSSProperties } from "react"

type EventType = {
  word: string
  gradient: string
  emojis: string[]
}

const TYPES: EventType[] = [
  {
    word: "concerts",
    gradient: "linear-gradient(92deg,#f97316,#ec4899)",
    emojis: ["🎤", "🎶", "🎸", "🔥"],
  },
  {
    word: "day parties",
    gradient: "linear-gradient(92deg,#f59e0b,#ef4444)",
    emojis: ["☀️", "🍹", "🎉", "🕶️"],
  },
  {
    word: "game nights",
    gradient: "linear-gradient(92deg,#8b5cf6,#3b82f6)",
    emojis: ["🎮", "🎲", "🏆", "⚡"],
  },
  {
    word: "comedy",
    gradient: "linear-gradient(92deg,#22c55e,#14b8a6)",
    emojis: ["😂", "🎭", "🎙️", "✨"],
  },
  {
    word: "popups",
    gradient: "linear-gradient(92deg,#ec4899,#8b5cf6)",
    emojis: ["🛍️", "📍", "👀", "✨"],
  },
  {
    word: "afterparties",
    gradient: "linear-gradient(92deg,#6366f1,#ec4899)",
    emojis: ["🌙", "🍾", "💃", "🔊"],
  },
]

const BURST = [
  { tx: -72, ty: -48, rot: -12, delay: 0 },
  { tx: 70, ty: -60, rot: 12, delay: 70 },
  { tx: 104, ty: -8, rot: 8, delay: 140 },
  { tx: -104, ty: 8, rot: -8, delay: 210 },
]

const INTERVAL_MS = 2800

export function RotatingEventType() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setI((n) => (n + 1) % TYPES.length),
      INTERVAL_MS
    )
    return () => clearInterval(id)
  }, [])

  const type = TYPES[i]

  return (
    <span className="relative inline-block whitespace-nowrap">
      <span
        key={i}
        className="type-word inline-block bg-clip-text py-[0.12em] leading-[1.15] text-transparent"
        style={{ backgroundImage: type.gradient }}
      >
        {type.word}
      </span>
      <span
        key={`burst-${i}`}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-10"
      >
        {type.emojis.map((emoji, n) => (
          <span
            key={n}
            className="emoji-burst absolute top-0 left-0 text-2xl md:text-3xl"
            style={
              {
                "--tx": `${BURST[n].tx}px`,
                "--ty": `${BURST[n].ty}px`,
                "--rot": `${BURST[n].rot}deg`,
                animationDelay: `${BURST[n].delay}ms`,
              } as CSSProperties
            }
          >
            {emoji}
          </span>
        ))}
      </span>
    </span>
  )
}
