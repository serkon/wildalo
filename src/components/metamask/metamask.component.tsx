import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box } from '@chakra-ui/react';

import { useTranslate } from 'src/components/translate/translate.component';
import { useSize } from 'src/theme/util/media-query';
import './metamask.component.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { MetamaskHandler } from './metamask.handler';

export const MetamaskComponent = () => {
  const { t } = useTranslate();
  const size = useSize();
  const selector = useSelector<RootState>((state) => state) as RootState;
  const [extension, setExtension] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isInit, setInit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure({
    onOpen: () => {
      // setExtension(true);
    },
    onClose: () => {
      setExtension(true);
      setConnected(true);
    },
  });
  const modalBodyRef = useCallback((node: HTMLDivElement) => {
    if (node) node.innerHTML = t('metamask.modal.content');
  }, []);

  useLayoutEffect(() => {
    setExtension(selector.metamask.extension);
  }, [selector.metamask.extension]);

  useLayoutEffect(() => {
    setConnected(selector.metamask.connected);
  }, [selector.metamask.connected]);

  useEffect(() => {
    const init = async () => {
      const error = await MetamaskHandler.init();
      console.log('isinit error: ', error);
      setInit(true);
    };
    init();
  }, []);

  return (
    <>
      <Button onClick={onOpen}>Open Modal {JSON.stringify(isOpen)}</Button>
      <Modal blockScrollOnMount={false} isOpen={isInit && !(extension && connected)} onClose={onClose} isCentered size={size}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent>
          <ModalHeader>
            <Box>
              {!extension && t('metamask.modal.header_extension')} / {JSON.stringify(selector.metamask.extension)}
            </Box>
            <Box>
              {!connected && t('metamask.modal.header_connected')} / {JSON.stringify(selector.metamask.connected)}
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody ref={modalBodyRef} />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
