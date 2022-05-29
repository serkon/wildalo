import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { PlayableComponent } from 'src/components/playable/playable.component';
import { set_layout_play_button } from 'src/store/reducers/LayoutReducer';
import { RootState } from 'src/store/store';
import { PageDashboard } from './dashboard/dashboard.page';
import { GameHero } from './hero/hero.page';
import { PageWildingAndHerds } from './wah/wah.page';

export const PageGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  useEffect(() => {
    // navigate('/game/dashboard');
  }, [navigate]);

  useEffect(() => {
    console.log('dispatch');
    dispatch(set_layout_play_button(true));
    return () => {
      dispatch(set_layout_play_button(false));
    };
  }, [dispatch]);

  return (
    <>
      <PlayableComponent />
      {store.layout.isPlayable && (
        <Box pointerEvents={'none'} className="play-now">
          <GameHero />
          <Routes>
            <Route path="wah" element={<PageWildingAndHerds />} />
            <Route path="dashboard" element={<PageDashboard />} />
            <Route path="*" element={<PageDashboard />} />
          </Routes>
          <Outlet />
        </Box>
      )}
    </>
  );
};
