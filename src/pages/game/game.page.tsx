import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { MetaMaskComponent } from 'src/components/metamask/metamask.component';
import { RedirectComponent } from 'src/components/redirect/redirect.component';
import { set_layout_play_button } from 'src/store/reducers/LayoutReducer';
import { PageDashboard } from './dashboard/dashboard.page';
import { GameHero } from './hero/hero.page';
import { PageWildingAndHerds } from './wah/wah.page';

export const PageGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // navigate('/game/dashboard');
  }, [navigate]);

  useEffect(() => {
    dispatch(set_layout_play_button(true));
    return () => {
      dispatch(set_layout_play_button(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RedirectComponent />
      <MetaMaskComponent />
      <GameHero />
      <Routes>
        <Route path="wah" element={<PageWildingAndHerds />} />
        <Route path="dashboard" element={<PageDashboard />} />
        <Route path="*" element={<PageDashboard />} />
      </Routes>
      <Outlet />
    </>
  );
};
