import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const PageGame = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/game/dashboard');
  }, [navigate]);

  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
