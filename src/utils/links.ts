export interface LinkItem {
  title: string;
  to: string;
  external?: boolean;
}
export const getLink = (links: LinkItem[], text: string): LinkItem | undefined => links.find((link) => link.title === text);
export const LinksHeader: LinkItem[] = [
  { title: 'links.home', to: '/' },
  { title: 'links.marketplace', to: 'marketplace' },
  { title: 'links.game', to: 'game' },
  { title: 'links.guide', to: 'guide' },
  { title: 'links.whitepaper', to: 'https://wildalo.gitbook.io/whitepaper', external: true },
];
export const LinkGame: LinkItem[] = [
  { title: 'links.dashboard', to: '/game/dashboard' },
  { title: 'links.wildlings_and_herds', to: '/game/wah' },
  { title: 'links.fight', to: '/game/fight' },
  { title: 'links.my_profile', to: '/user/profile' },
];
export const LinksFooter: { name: string; links: LinkItem[] }[] = [
  {
    name: 'services',
    links: [
      { title: 'links.game', to: 'game' },
      { title: 'links.marketplace', to: 'marketplace' },
    ],
  },
  /**/
  {
    name: 'about',
    links: [
      { title: 'links.whitepaper', to: 'https://wildalo.gitbook.io/whitepaper', external: true },
      // { title: 'links.team', to: 'team' },
      // { title: 'links.about_us', to: 'about' },
    ],
  },
  /**/
  {
    name: 'help',
    links: [
      { title: 'links.guide', to: 'guide' },
      // { title: 'links.contact_us', to: 'contact' },
    ],
  },
];
export const LinksTerms: LinkItem[] = [
  { title: 'links.terms_and_conditions', to: 'terms-and-conditions.pdf', external: true },
  // { title: 'links.whitepaper', to: 'https://wildalo.gitbook.io/whitepaper', external: true },
  { title: 'links.privacy_policy', to: 'privacy-and-policy.pdf', external: true },
];
export const LinkSocials: LinkItem[] = [
  { title: 'social.discord', to: 'https://discord.gg/Vypt9GUjKh', external: true },
  { title: 'social.telegram', to: 'https://t.me/+jO3E4SQjH6U2MmEx', external: true },
  { title: 'social.twitter', to: 'https://twitter.com/wildalogame', external: true },
  // { title: 'social.facebook', to: 'https://www.facebook.com/wildalogame' },
  // { title: 'social.reddit', to: 'https://www.reddit.com/r/wildalo/' },
  // { 'title': 'social.youtube', 'to': 'https://www.youtube.com/channel/UCeqL4KyprLNMKwFQueOdsIw' },
  // { 'title': 'social.linkedin', 'to': 'https://www.linkedin.com/in/wildalo-game-a23921229/' },
  // { 'title': 'social.instagram', 'to': 'https://www.instagram.com/wildalogame/' },
  // { 'title': 'social.medium', 'to': 'https://medium.com/@wildalogame' },
];
