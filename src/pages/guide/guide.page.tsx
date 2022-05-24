import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Container, Heading } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import { useTranslate } from 'src/components/translate/translate.component';
import './guide.page.scss';

const faqs = [
  {
    title: 'Ecosystem',
    description: `Wildalo is a wild nature world filled with amazing animals also known as wildlings. Wildalo players, also known as Rangers, collect these wildlings to grow them, form herds with them and fight their herds with other herds.`,
  },
  {
    title: 'Connection & Currencies',
    description:
      'Everyone with a digital wallet (Metamask) can join the ecosystem and be a ranger. There are two currencies in the Wildalo system: FODR (In-game currency) and WARC (Wildalo Ranger Token, game’s governance token). Wildalo uses the Avalanche network for transactions. Players can buy WARC by exchanging AVAX with WARC. FODR is earned by rangers in the game.',
  },
  {
    title: 'Wildlings',
    description: `Wildlings are valuable NFTs minted with unique stats. Each wildling has six primary stats: Attack, Defense, Speed, Heal, Weight and Lifetime. As well as, four secondary stats: Attack buff, Defense buff, Damage reflection and Poison. Each wildling type has one of the three rarity levels: Common, Rare or Exotic.`,
  },
  {
    title: 'Forming Herds',
    description: `Rangers create one or more herds from their wildlings to fight with other herds. A herd consists of four wildlings. One wildling can only be a part of one herd. Rangers can form multiple herds as many as the number wildlings allow.`,
  },
  {
    title: 'Up Leveling',
    description: `Wildlings can grow more powerful by gaining levels: They are created at level 1 and can be up leveled all the way to level 10. With every new up level, wildlings improve all their stats by 5% and one random stat by 10%. Rangers need to sacrifice one similar Wilding card to up level their Wildling and maintain at least 10 WARC in their account.`,
  },
  {
    title: 'Fighting & Awards',
    description: `Once rangers form herds, they can fight with them against other herds. Wildalo selects two herds to fight automatically based on the herds’ level. Rangers can win FODR (Wildalo’s in-game currency) as rewards. A portion of WARC (Wildalo’s governance token) will also be distributed to Rangers as fight awards early in the game. The number of herds a ranger can control to fight simultaneously depends on the amount of WARC in their account.`,
  },
  {
    title: 'Marketplace',
    description: `Wildlings ecosystem is supported by its marketplace. Rangers can buy Wildalo card packs to gain random new Wildlings. Rangers can buy and sell wildings in any NFT marketplace or among each other.`,
  },
];

export const PageFaq = () => {
  const { t } = useTranslate();

  return (
    <Box
      backgroundImage={'url(/images/pages/guide/guide-bottom.png)'}
      backgroundPosition="bottom center"
      backgroundSize={'contain'}
      backgroundRepeat="no-repeat"
      className="page-guide"
    >
      <Container maxW="container.md">
        <Heading as="h1" size="xl" variant="center" isTruncated color="white" className="page-header">
          {t('guide.title')}
        </Heading>
        <Box color={'white'} mb="76px">
          {t('guide.description')}
        </Box>
        <Accordion allowToggle mb="250px">
          {faqs.map((item, key) => (
            <AccordionItem key={key}>
              {({ isExpanded }) => (
                <>
                  <h2 className={isExpanded ? 'expanded' : 'collapsed'}>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {item.title}
                      </Box>
                      {isExpanded ? <ArrowUpIcon fontSize="24px" /> : <ArrowDownIcon fontSize="24px" />}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{item.description}</AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
};
