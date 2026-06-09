import { useEffect, useState } from 'react';

/**
 * Types out `text` character by character. Renders the full text immediately
 * during prerendering and when the user prefers reduced motion.
 */
export function useTypewriter(text: string, speedMs = 35, startDelayMs = 400) {
  const reduceMotion =
    typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [length, setLength] = useState(() => (reduceMotion ? text.length : 0));

  useEffect(() => {
    if (reduceMotion) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setLength(i);
        if (i >= text.length) clearInterval(interval);
      }, speedMs);
    }, startDelayMs);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speedMs, startDelayMs, reduceMotion]);

  return { typed: text.slice(0, length), done: length >= text.length };
}
