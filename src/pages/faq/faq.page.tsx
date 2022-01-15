import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Container, Heading } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';

import { useTranslate } from 'src/components/translate/translate.component';
import './faq.page.scss';

const faqs = [
  {
    'title': 'Ecosystem',
    'description': `Wildalo is a wild nature world filled with amazing animals also known as wildlings. Wildalo players, also known as Rangers, collect these wildlings to grow them, form herds with them and fight their herds with other herds.`,
  },
  { 'title': 'Connection', 'description': 'Everyone with a digital wallet (Metamask) can join the ecosystem and be a ranger.' },
  {
    'title': 'Wildlings',
    'description': `Each wildling has six primary stats: Attack, Defense, Speed, Heal, Weight and Lifetime. As well as, four secondary stats: Attack buff, Defense buff, Damage reflection and Poison. Each wildling type has one of the three rarity levels: Common (rarity level 1), Rare (rarity level 2) or Exotic (rarity level 3).`,
  },
  {
    'title': 'Forming Herds',
    'description': `Rangers create one or more herds from their wildlings to fight with other herds. A herd consists of four wildlings. One wildling can only be a part of one herd. Rangers can form multiple herds as many as the number wildlings allow.`,
  },
  {
    'title': 'Up Leveling',
    'description': `Wildlings have levels: They are created at level-1 and can be up leveled all the way to level 20. With every new up level, wildlings improve all their stats by 10%.`,
  },
  {
    'title': 'Fights',
    'description': `Once rangers have a herd and decide to fight with it, they choose to get in the fight queue. Wildalo selects two herds to fight automatically.`,
  },
  {
    'title': 'Marketplace',
    'description': `Wildlings ecosystem is supported by its marketplace. Rangers can buy and sell their wildings in the marketplace in an auction format. And the second way is to buy wildling packages from Wildalo.`,
  },
];

export const FAQPage = () => {
  const { t } = useTranslate();
  return (
    <>
      <Heading as="h3" size="lg" variant="center" isTruncated className="page-banner">
        {t('main.slogan')}
      </Heading>
      <Container maxW="container.md">
        <Heading as="h1" size="xl" variant="center" isTruncated color="white" className="page-header">
          How to Play
        </Heading>
        <Accordion allowToggle>
          {faqs.map((item, key) => (
            <AccordionItem key={key}>
              {({ isExpanded }) => (
                <>
                  <h2 className={isExpanded ? 'expanded' : 'collapsed'}>
                    <div className="dot">{key + 1}</div>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {item.title}
                      </Box>
                      {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{item.description}</AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </>
  );
};
