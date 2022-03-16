import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

import { useTranslate } from 'src/components/translate/translate.component';
import { useSize } from 'src/theme/util/media-query';
import './metamask.component.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { MetaMaskHandler } from './metamask.handler';

export const MetaMaskComponent = () => {
  const { t } = useTranslate();
  const size = useSize();
  const selector = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const [extension, setExtension] = useState(false);
  const [network, setNetwork] = useState(false);
  const [permission, setPermission] = useState(false);
  const [isInit, setInit] = useState(false);
  const { onClose } = useDisclosure({
    onOpen: () => {
      // setExtension(true);
    },
    onClose: () => {
      setExtension(true);
      setNetwork(true);
      setPermission(true);
    },
  });
  const modalBodyRef = useCallback((node: HTMLDivElement) => {
    if (node) node.innerHTML = t('metamask.modal.content');
  }, []);

  useLayoutEffect(() => {
    setExtension(selector.metamask.extension);
  }, [selector.metamask.extension]);

  useLayoutEffect(() => {
    setNetwork(selector.metamask.network);
  }, [selector.metamask.network]);

  useLayoutEffect(() => {
    setPermission(selector.metamask.permission);
  }, [selector.metamask.permission]);

  useEffect(() => {
    const init = async () => {
      const success = await MetaMaskHandler.init();
      setInit(success);
    };
    init();
  }, []);

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isInit && !(extension && network && permission)} onClose={onClose} isCentered size={size}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent>
          <ModalHeader>
            {!extension && t('metamask.modal.header_extension')}
            {extension && !network && t('metamask.modal.header_connected')}
            {extension && network && !permission && t('metamask.modal.header_permission')}
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
