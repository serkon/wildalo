import { useState, useEffect } from 'react';
import theme from 'src/theme';

type BreakPoint = keyof typeof theme;
export function useMediaQuery(breakpoint: BreakPoint) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${theme.breakpoints[breakpoint]})`);

    setMatches(media.matches);
    media.onchange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
      // console.log(matches);
    };
  }, [breakpoint, matches]);

  return matches;
}

export function useSize() {
  const [matches, setMatches] = useState<string>();

  useEffect(() => {
    const breakpoints = Object.keys(theme.breakpoints);
    let status = false;
    const mediaList: MediaQueryList[] = [];

    if (!status) {
      breakpoints.forEach((_element: string, key: number) => {
        const media = window.matchMedia(`(max-width: ${theme.breakpoints[breakpoints[key]]})`);

        mediaList.push(media);
        media.onchange = (e: MediaQueryListEvent) => {
          setMatches(e.matches ? _element : breakpoints[key + 1]);
        };

        if (media.matches && status === false) {
          setMatches(breakpoints[key]);
          status = true;
        }
      });
    }

    return () => {
      // cancel the subscription
      status = false;
      mediaList.forEach((media: MediaQueryList) => {
        media.onchange = null;
      });
    };
  }, [matches]);

  return matches;
}
