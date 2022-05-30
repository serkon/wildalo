import { useEffect, useState } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Image } from '@chakra-ui/react';

import { useTranslate } from 'src/components/translate/translate.component';
import { useMediaQuery, useSize } from 'src/theme/util/media-query';

import preview from './preview.svg';
import { useNavigate } from 'react-router-dom';
import { set_desktop } from 'src/store/reducers/LayoutReducer';
import { useDispatch } from 'react-redux';

export const RedirectComponent = () => {
  const { t } = useTranslate();
  const size = useSize();
  const isLargerThan = useMediaQuery('sm');
  const [isInit, setInit] = useState(false);
  const navigate = useNavigate();
  const { onClose } = useDisclosure({
    onClose: () => {
      document.documentElement.classList.remove('modal');
      setInit(false);
      navigate('/');
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setInit(!isLargerThan);
    dispatch(set_desktop(isLargerThan));
    !isLargerThan ? document.documentElement.classList.add('modal') : document.documentElement.classList.remove('modal');

    return () => {
      setInit(false);
      dispatch(set_desktop(isLargerThan));
    };
  }, [dispatch, isLargerThan]);

  console.log('redirect', isInit);

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isInit} onClose={onClose} isCentered size={size}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent bgColor={'#0B2F28'} className="modal-content" mx="25px">
          <ModalHeader pb="0 !important" pt="40px !important" />
          <ModalCloseButton className="close" />
          <ModalBody className="body">
            <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
              <Image src={preview} alt="preview" />
              <Box alignItems={'center'} display="flex" flexDirection={'column'}>
                <Box fontSize={'20px'} fontWeight="900" textAlign={'center'} mt="8">
                  Please visit Wildalo on desktop to start playing now!
                </Box>
                <Box mt="4" textAlign={'center'}>
                  Currently we only support desktop for better experience and security.
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
