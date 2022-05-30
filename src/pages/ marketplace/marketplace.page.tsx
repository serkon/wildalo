import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { PlayableComponent } from 'src/components/playable/playable.component';
import { RootState } from 'src/store/store';

export const PageMarketplace = () => {
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;

  return (
    <>
      <PlayableComponent />
      {store.layout.isPlayable && (
        <Box alignItems="center" justifyContent={'center'} color="white" width="100%" height={'100%'} flexGrow="1" display={'flex'}>
          MarketPlace page
        </Box>
      )}
    </>
  );
};
