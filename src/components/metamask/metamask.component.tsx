import React from 'react';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Link } from '@chakra-ui/react';

import { useTranslate } from 'src/components/translate/translate.component';
import { useMediaQuery, useSize } from 'src/theme/util/media-query';
import { RootState } from 'src/store/store';
import { MetaMaskHandler } from './metamask.handler';
import { Wildapter } from './adaptor';
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
  const isLargerThan = useMediaQuery('sm');

  const navigate = useNavigate();
  const { onClose } = useDisclosure({
    onOpen: () => {
      // setExtension(true);
    },
    onClose: () => {
      document.documentElement.classList.remove('modal');
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
  const downloadMetamask = () => {
    window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
  };
  const checkPermission = () => {
    Wildapter.enablePermissionToAccessAccounts();
  };
  const reload = () => {
    navigate('/');
    window.location.reload();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    !isLargerThan ? document.documentElement.classList.add('modal') : document.documentElement.classList.remove('modal');
  }, [isLargerThan]);

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isInit && !(extension && network && permission)} onClose={onClose} isCentered size={size}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent bgColor={'#0B2F28'} className="modal-content">
          <ModalHeader className="header">{t(`metamask.modal.${!extension ? 'extension' : !permission ? 'permission' : !network ? 'network' : ''}.header`)}</ModalHeader>
          <ModalCloseButton className="close" onClick={() => reload()} />
          <ModalBody className="body">
            {!extension && <Box className={`metamask-logo`} alignSelf="center" />}
            <Box display={'flex'} alignItems={!extension ? 'center' : 'flex-start'} flexDirection={!extension ? 'column' : 'row'}>
              <Box>
                <Box className={`content${extension ? ' content-left' : ''}`} ref={modalBodyRef} />
                {extension && !permission && (
                  <Button variant={'primary'} onClick={checkPermission}>
                    {t(`metamask.modal.permission.button`)}
                  </Button>
                )}
              </Box>
              {extension && !permission && <Box className={`metamask-permission`} />}
              {extension && permission && !network && <Box className={`metamask-network`} />}
            </Box>
            {!extension && (
              <Button variant={'primary'} onClick={downloadMetamask} margin="auto">
                {t(`metamask.modal.extension.button`)}
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
