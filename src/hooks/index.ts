import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMQReal } from 'src/theme/util/media-query';

export const ScrollTo = ({ position = 0 }: { position?: number }): null => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ 'top': 0, 'behavior': 'smooth' });
  }, [location, position]);
  return null;
};

export const useSetTitle = (title: string): void => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export const useProcess = () => process.env;

export const useMobile = () => {
  const isDesktop = useMQReal('md');
  const root: HTMLDivElement | null = document.getElementById('root') as HTMLDivElement;
  useEffect(() => {
    !isDesktop ? root?.classList.add('mobile') : root?.classList.remove('mobile');
  });
};

// https://stackoverflow.com/a/66650583/2184182
export const useStateWithCallback = <T>(initialState: T): [state: T, setState: (updatedState: React.SetStateAction<T>, callback?: (updatedState: T) => void) => void] => {
  const [state, setState] = useState<T>(initialState);
  const callbackRef = useRef<(updated: T) => void>();
  const handleSetState = (updatedState: React.SetStateAction<T>, callback?: (updatedState: T) => void) => {
    callbackRef.current = callback;
    setState(updatedState);
  };
  useEffect(() => {
    if (typeof callbackRef.current === 'function') {
      callbackRef.current(state);
      callbackRef.current = undefined;
    }
  }, [state]);
  return [state, handleSetState];
};

// https://stackoverflow.com/a/66563682/2184182
type ScheduledCallback = () => void;
export const useScheduleNextRenderCallback = () => {
  const ref = useRef<ScheduledCallback>();
  useEffect(() => {
    if (ref.current !== undefined) {
      ref.current();
      ref.current = undefined;
    }
  });
  const schedule = useCallback((fn: ScheduledCallback) => {
    ref.current = fn;
  }, []);
  return schedule;
};
