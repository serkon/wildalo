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

/**
 * Herd DTOS
 */

export enum HerdStatus {
  FIGHTING = 'FIGHTING',
  IDLE = 'IDLE',
  DEAD = 'DEAD',
}

export interface Herd {
  _id: string;
  name: string;
  win: number;
  lost: number;
  status: HerdStatus;
  cards: Array<Animal>;
  leve: number;
  bonus: boolean;
}
