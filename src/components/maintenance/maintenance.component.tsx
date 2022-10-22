import { useEffect } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Image } from '@chakra-ui/react';

import { useTranslate } from 'src/components/translate/translate.component';
import { useSize } from 'src/theme/util/media-query';

import preview from './preview.png';
import { useApi, useDirection } from 'src/hooks';
import { Maintenance } from 'src/utils/dto';
import { HttpResponse } from 'src/components/axios/axios.component';
import { set_maintenance } from 'src/store/reducers/LayoutReducer';
import { useDispatch, useSelector } from 'react-redux';
import { LinksHeader } from 'src/utils/links';
import { RootState } from 'src/store/store';

export const MaintenanceComponent = () => {
  const { t } = useTranslate();
  const store = useSelector((state: RootState) => state);
  const size = useSize();
  const direction = useDirection();
  const { onClose } = useDisclosure({
    onClose: () => {
      direction(LinksHeader[0]);
    },
  });
  const dispatch = useDispatch();

  const { isError } = useApi(
    { url: '/admin/maintenance' },
    (data: HttpResponse<Maintenance>) => {
      dispatch(set_maintenance(data.data.status));
      console.log('after party:', data.data.status);
    },
    null,
    process.env.REACT_APP_MAINTENANCE === 'false',
  );

  useEffect(() => {
    if (isError) {
      dispatch(set_maintenance(isError));
    }
  }, [dispatch, isError]);

  useEffect(() => {
    dispatch(set_maintenance(process.env.REACT_APP_MAINTENANCE === 'true'));
    console.log('ilk', process.env.REACT_APP_MAINTENANCE === 'true');
  }, []);

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={store.layout.maintenance} onClose={onClose} isCentered size={size}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent bgColor={'#0B2F28'} className="modal-content" mx="25px">
          <ModalHeader pb="0 !important" pt="40px !important" />
          <ModalCloseButton className="close" />
          <ModalBody className="body">
            <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
              <Image src={preview} alt="preview" minH="230px" minW="230px" />
              <Box alignItems={'center'} display="flex" flexDirection={'column'}>
                <Box fontSize={'20px'} fontWeight="900" textAlign={'center'} mt="8">
                  Coming Soon
                </Box>
                <Box mt="4" textAlign={'center'}>
                  Do not worry. You will be able to start earning very soon!
                </Box>
                <Button variant={'primary'} mt="24px" bgGradient={'linear-gradient(263.62deg, #FFC633 33.34%, #FFAE1B 65.52%);'} minW="140px" onClick={onClose}>
                  {t(`common.close`)}
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
