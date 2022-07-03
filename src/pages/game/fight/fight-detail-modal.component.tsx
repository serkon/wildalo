import { Modal, ModalHeader, ModalBody, Box, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure, useToast, Grid, GridItem, Flex } from '@chakra-ui/react';
import React, { useCallback, useImperativeHandle } from 'react';
import { useState } from 'react';
import { AnimalCard } from 'src/components/animal/animal.component';
import { api } from 'src/components/axios/axios.component';
import { HerdBonus } from 'src/components/bonus/herd-bonus.component';
import { Fight as FightComponent } from 'src/components/fight/fight.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { Fight } from 'src/utils/dto';
import './fight-detail-modal.component.scss';

interface Props {}

export interface ImperativeHandle {
  openModal: (id: string) => void;
}

export const FightDetailModal = React.forwardRef<ImperativeHandle, Props>((_props, forwardedRef) => {
  const toast = useToast();
  const { t } = useTranslate();
  const { onClose } = useDisclosure({
    onClose: () => {
      setOpen(false);
    },
  });
  const [open, setOpen] = useState(false);
  const [fight, setFight] = useState<Fight | null>();
  const insertHTMLRef = useCallback(
    (node: HTMLDivElement) => {
      console.log(node);
      if (node) node.innerHTML = t(`common.you_can_find`);
    },
    [t],
  );

  useImperativeHandle(forwardedRef, () => ({
    openModal(id: string) {
      const getFight = async () => {
        try {
          const response = await api.post('/fight/preview', { data: { id } });
          setFight(response.data.data);
        } catch (e) {
          toast({
            title: t('common.Fight_Not_Found'),
            description: t('common.Connect_With_Administer'),
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      };
      getFight();
      setOpen(true);
    },
  }));

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={open} onClose={onClose} isCentered size="4xl">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent bgColor={'#0B2F28'} className="modal-content" mx="25px">
          <ModalHeader className="header" p="14px 32px !important" mb="0 !important" fontSize={'26px'}>
            {t('common.Fight_Detail')}
          </ModalHeader>
          <ModalCloseButton className="close" />
          <ModalBody className="body fight-detail-modal">
            {fight ? (
              <>
                <FightComponent detail={fight} modal={true} backgroundColor="#09241F" borderRadius="12px" p="24px" />
                <Box className="herd-bonus-list" mt="28px">
                  <HerdBonus herd={fight.fighters[0].herd} />
                </Box>
                <Flex gridColumnGap={4} gridRowGap={2} className="fight-detail-modal-layout">
                  <Box className="herds-left">
                    <Grid className="herds" templateColumns="repeat(2, 1fr)" gridColumnGap={16} gridRowGap={8}>
                      {fight.fighters[0].herd.animals?.map((item, key) => (
                        <GridItem className="animal-grid-item" key={key}>
                          <AnimalCard data={item.animal} position={key} />
                        </GridItem>
                      ))}
                    </Grid>
                  </Box>
                  <Box className="versus" />
                  <Box className="herds-right">
                    <Grid className="herds" templateColumns="repeat(2, 1fr)" gridColumnGap={16} gridRowGap={8}>
                      {fight.fighters[0].herd.animals?.map((item, key) => (
                        <GridItem className="animal-grid-item" key={key}>
                          <AnimalCard data={item.animal} position={item.position} />
                        </GridItem>
                      ))}
                    </Grid>
                  </Box>
                </Flex>
                <Box display="flex" alignItems="center" justifyContent="center" mt="58px" color="#86B7AD" fontSize="15px" ref={insertHTMLRef} />
              </>
            ) : (
              <Box opacity={0.6} width="56" textAlign={'center'} lineHeight={'25px'} mx="auto" marginTop="14" marginBottom="8" fontSize="18px">
                {t('dashboard.no_fights_found')}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
