import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { PlayableComponent } from 'src/components/playable/playable.component';
import { set_layout_play_button } from 'src/store/reducers/LayoutReducer';
import { RootState } from 'src/store/store';
import { PageDashboard } from './dashboard/dashboard.page';
import { GameHero } from './hero/hero.page';
import { PageWildingAndHerds } from './wah/wah.page';

export const PageGame = () => {
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;

  useEffect(() => {
    dispatch(set_layout_play_button(true));
    return () => {
      dispatch(set_layout_play_button(false));
    };
  }, [dispatch]);

  return (
    <>
      <PlayableComponent />
      {store.layout.isPlayable && (
        <Box pointerEvents={store.layout.isPlayable ? 'all' : 'none'}>
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
