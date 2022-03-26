import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { set_layout_play_button } from 'src/store/reducers/LayoutReducer';
import { GameHero } from './hero/hero.page';

export const PageGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    navigate('/game/dashboard');
  }, [navigate]);

  useEffect(() => {
    dispatch(set_layout_play_button(true));
    return () => {
      dispatch(set_layout_play_button(false));
    };
  }, []);

  return (
    <>
      <GameHero />
      <Outlet />
    </>
  );
};
