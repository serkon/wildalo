import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

export const useProcess = () => {
  useEffect(() => {
    const p = process.env;
    console.log('process.env:', p);
  });
};

export const useMobile = () => {
  const isDesktop = useMQReal('md');
  const root: HTMLDivElement | null = document.getElementById('root') as HTMLDivElement;
  useEffect(() => {
    !isDesktop ? root?.classList.add('mobile') : root?.classList.remove('mobile');
  });
};
