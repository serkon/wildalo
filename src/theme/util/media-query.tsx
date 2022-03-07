import { useState, useEffect } from 'react';
import theme from 'src/theme';

type BreakPoint = keyof typeof theme;
export function useMQReal(breakpoint: BreakPoint) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${theme.breakpoints[breakpoint]})`);

    setMatches(media.matches);
    media.onchange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
      console.log(matches);
    };
  }, [breakpoint, matches]);

  return matches;
}
