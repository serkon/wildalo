import React from 'react';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Link } from '@chakra-ui/react';

import { useTranslate } from 'src/components/translate/translate.component';
import { useSize } from 'src/theme/util/media-query';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { MetaMaskHandler } from './metamask.handler';
import './metamask.component.scss';

interface Link {
  to: string;
  external?: boolean;
}

const items: Link[] = [
  { to: 'https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche', external: true },
  { to: 'https://discord.gg/Vypt9GUjKh', external: true },
  { to: 'https://t.me/+jO3E4SQjH6U2MmEx', external: true },
  { to: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', external: true },
];
const Links = () => {
  const { t } = useTranslate();
  const links = JSON.parse(t('metamask.modal.help_content'));
  return (
    <React.Fragment>
      <ul className="help-content">
        {items.map((item: Link, key: number) => (
          <li key={key}>
            <Link href={item.to} variant="ghost" target={'_blank'}>
              {links[key]}
            </Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

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
  const modalBodyRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) node.innerHTML = t(`metamask.modal.${!extension ? 'extension' : !permission ? 'permission' : !network ? 'network' : ''}.content`);
    },
    [extension, network, permission, t],
  );
  const direction = () => {
    window.open(items[3].to, '_blank');
  };

  useLayoutEffect(() => {
    setExtension(selector.metamask.extension);
  }, [selector.metamask.extension]);

  useLayoutEffect(() => {
    setNetwork(selector.metamask.network);
  }, [selector.metamask.network]);

  useLayoutEffect(() => {
    setPermission(selector.metamask.permission);
  }, [selector.metamask.permission]);

  const createMetaMask = () => new MetaMaskHandler();

  useEffect(() => {
    const init = async () => {
      const status = await createMetaMask().init();
      !status && console.log('TODO: Disconnect logged in user');
      setInit(true);
    };
    !isInit && createMetaMask();

    init();
  }, []);

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isInit && !(extension && network && permission)} onClose={onClose} isCentered size={size}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent bgColor={'#0B2F28'} className="metamask-modal-content">
          <ModalHeader className="header">{t(`metamask.modal.${!extension ? 'extension' : !permission ? 'permission' : !network ? 'network' : ''}.header`)}</ModalHeader>
          <ModalCloseButton className="close" />
          <ModalBody className="body">
            {!extension && <Box className={`metamask-logo`} />}
            <Box display={'flex'}>
              <Box>
                <Box className={`content${extension ? ' content-left' : ''}`} ref={modalBodyRef} />
                {extension && (
                  <Button variant={'primary'} onClick={direction}>
                    {t(`metamask.modal.${!permission ? 'permission' : !network ? 'network' : ''}.button`)}
                  </Button>
                )}
              </Box>
              {!permission && <Box className={`metamask-permission`} />}
              {permission && !network && <Box className={`metamask-network`} />}
            </Box>
            {!extension && (
              <Button variant={'primary'} onClick={direction}>
                {t(`metamask.modal.button`)}
              </Button>
            )}
            <Box className="help">
              <Box className="help-title">{t('metamask.modal.help_title')}</Box>
              <Links />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
