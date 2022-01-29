import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const ScrollTo = ({position=0}: {position?:number} ): null => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ 'top': 0, 'behavior': 'smooth' });
  }, [location, position]);

  return null;
};
