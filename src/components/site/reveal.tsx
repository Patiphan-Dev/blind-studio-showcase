"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
}

/**
 * Fades + lifts its children into view the first time they enter the viewport.
 * Falls back to visible immediately when IntersectionObserver is unavailable
 * or the user prefers reduced motion (handled in CSS).
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
