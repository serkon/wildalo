import { Animal } from 'src/components/animal/animal.dto';
import { User } from 'src/pages/user/user.dto';

/**
 * User DTOS
 */
export interface Metamask {
  walletAddress: string;
  fodrBalance: string;
  warcBalance: string;
}

export interface Ranger extends User {
  claimableWarcBalance: string;
  claimableFodrBalance: string;
  metamask?: Metamask;
}

export interface Fighter {
  id: string;
  imageId: string;
  username: string;
  herdname: string;
}

export interface Fight {
  id: string;
  fighters: Fighter[];
  elapsedTimeSec: number;
}

export interface Fights {
  id: string;
  fights: Fight[];
  winScore: number;
  totalScore: number;
  treshold: number;
}

export interface Herd {
  id: string;
  cards: Array<Animal>;
  win: number;
  lost: number;
  name: string;
  status: 'fighting' | 'idle' | 'dead';
}
