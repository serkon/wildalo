import React from 'react';
import { Avatar, Center, Flex, HStack, Stack, Text, Image, Divider } from '@chakra-ui/react';

import { Timer } from 'src/components/timer/timer.component';
import { Fight as FightInterface } from './fight.dto';
import './fight.component.scss';

interface FightDetail {
  detail: FightInterface;
}

export const Fight = (props: FightDetail) => {
  const [color, setColor] = React.useState({ state: false });
  const changeTextColor = (status: boolean) => {
    setColor({ state: status });
  };

  return (
    <>
      <Flex justifyContent={'space-between'} className="fight">
        <HStack>
          <Avatar margin="0" width="36px" height={'36px'} src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/${props.detail.fighters[0].imageId}.jpeg`} />
          <Stack className="fighter">
            <Text className="ranger">{props.detail.fighters[0].username}</Text>
            <Text className="herd">{props.detail.fighters[0].herdname}</Text>
          </Stack>
        </HStack>
        <Center>
          <Image src="/images/common/vs.svg" />
        </Center>
        <HStack>
          <Avatar margin="0" width="36px" height={'36px'} src={`${process.env.REACT_APP_PUBLIC_URL}/uploads/${props.detail.fighters[1].imageId}.jpeg`} />
          <Stack className="fighter">
            <Text className="ranger">{props.detail.fighters[1].username}</Text>
            <Text className="herd">{props.detail.fighters[1].herdname}</Text>
          </Stack>
        </HStack>
        <Stack className="timer" alignItems={'center'} justifyContent={'center'} color={color.state ? '#D19863' : '#77D163'}>
          <Timer
            date={new Date(props.detail.remainingTime)}
            onChange={(state) => changeTextColor(Number(state.hours) === 0 && Number(state.minutes) <= 50)}
            onComplete={() => (changeTextColor(true), console.log('asd'))}
          />
        </Stack>
      </Flex>
      <Divider borderColor={'rgb(42 89 80 / 60%)'} />
    </>
  );
};
