import React from 'react';
import { Avatar, Center, Flex, HStack, Stack, Text, Image, Divider, VStack } from '@chakra-ui/react';

import { Timer } from 'src/components/timer/timer.component';
import { useTranslate } from 'src/components/translate/translate.component';
import { Fight as FightInterface } from 'src/utils/dto';
import './fight.component.scss';

interface Props {
  detail: FightInterface;
  modal?: boolean;
  [key: string]: any;
}

export const Fight = (props: Props) => {
  const { detail, modal, ...rest } = props;
  const { t } = useTranslate();
  const [color, setColor] = React.useState({ state: false });
  const changeTextColor = (status: boolean) => {
    setColor({ state: status });
  };

  return (
    <>
      <Flex justifyContent={'space-between'} className={`fight${modal ? ' with-modal' : ''}`} {...rest}>
        <HStack className="fighter-one">
          <Avatar margin="0" width="36px" height={'36px'} src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/${detail.fighters[0].imageId}.jpeg`} />
          <Stack className="fighter">
            <Text className="ranger">{detail.fighters[0].username}</Text>
            <Text className="herd">{detail.fighters[0].herdname}</Text>
          </Stack>
        </HStack>
        <Center className="center-area">
          <Image src="/images/common/vs.svg" hidden={modal} />
          <VStack>
            <Text hidden={!modal} className="fight-still-continue">
              {t('common.This_fight_still_continues')}
            </Text>
            <Timer diff={detail.remainingTime} onChange={(state) => changeTextColor(Number(state.hours) === 0 && Number(state.minutes) <= 50)} hidden={!modal} />
          </VStack>
        </Center>
        <HStack className="fighter-second">
          <Avatar margin="0" width="36px" height={'36px'} src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/${detail.fighters[1].imageId}.jpeg`} />
          <Stack className="fighter">
            <Text className="ranger">{detail.fighters[1].username}</Text>
            <Text className="herd">{detail.fighters[1].herdname}</Text>
          </Stack>
        </HStack>
        <Stack className="timer" alignItems={'center'} justifyContent={'center'} color={color.state ? '#D19863' : '#77D163'}>
          <Timer diff={detail.remainingTime} onChange={(state) => changeTextColor(Number(state.hours) === 0 && Number(state.minutes) <= 50)} hidden={modal} />
          {
            // onComplete={() => (changeTextColor(true), console.log(''))}
          }
        </Stack>
      </Flex>
      <Divider borderColor={'rgb(42 89 80 / 60%)'} />
    </>
  );
};
