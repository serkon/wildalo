import { Animal, Region, SecondaryStat } from 'src/components/animal/animal.dto';

/**
 * Fight DTOS
 */
export interface Fighter {
  _id: string;
  imageId: string;
  username: string;
  herdname: string;
}

export interface Fight {
  _id: string;
  fighters: Fighter[];
  remainingTime: number; // remaining time milisecond
}

export interface FightsOverview {
  fights: Fight[];
  winScore: number;
  totalScore: number;
  treshold: number;
}

export interface FightDetail {
  _id: string;
}

/**
 * Herd DTOS
 */
export enum HerdState {
  FIGHTING = 'FIGHTING',
  IDLE = 'IDLE',
  DEAD = 'DEAD',
}

export interface HomesteadBonus {
  type: SecondaryStat;
  value: number;
  region: Region;
  animalCount: number;
}

export interface OtherBonus {
  type: SecondaryStat;
  value: number;
  region: Region;
  animalCount: number;
}

export interface Herd {
  _id: string;
  name: string;
  win: number;
  lost: number;
  state: HerdState;
  animals?: { position: number; animal: Animal }[];
  bonus: Array<HomesteadBonus | OtherBonus>;
  level: number;
}

export interface HerdRequest {
  animals?: { position: number; _id: Animal['_id'] }[];
  name: string;
}

export type HerdCreateRequest = HerdRequest;

export interface HerdUpdateRequest extends HerdRequest {
  _id: string;
}

export interface HerdDeteleRequest {
  _id: string;
}
