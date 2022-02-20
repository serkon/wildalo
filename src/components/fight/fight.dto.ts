import { Animal } from 'src/components/animal/animal.dto';

export interface Fighter {
  id: string;
  imageId: string;
  username: string;
  herdname: string;
}

export interface Fight {
  id: string;
  fighters: Fighter[];
  elapsedTime: number;
}

export interface FightOverview {
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
