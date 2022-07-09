import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { set_playable } from 'src/store/reducers/LayoutReducer';
import { RedirectComponent } from 'src/components/redirect/redirect.component';
import { MetaMaskComponent } from 'src/components/metamask/metamask.component';

export const PlayableComponent = () => {
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set_playable(!store.layout.maintenance && store.layout.isDesktop && store.metamask.status && store.ranger.login));
  }, [store.layout.maintenance, store.metamask.status, store.layout.isDesktop, store.ranger.login, dispatch]);

  return (
    <>
      {
        // TODO (maintenance):: uncomment above when maintenance is ready and remove below
        /*
          <MaintenanceComponent />
          {!store.layout.maintenance && <RedirectComponent />}
          {!store.layout.maintenance && store.layout.isDesktop && <MetaMaskComponent />}
        */
      }

      <RedirectComponent />
      {store.layout.isDesktop && <MetaMaskComponent />}
    </>
  );
};
