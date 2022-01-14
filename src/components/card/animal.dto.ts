export enum AnimalType {
  COMMON = 'COMMON',
  RARE='RARE',
  EXOTIC='EXOTIC'
}

export enum AnimalName {
  MUSTANG='MUSTANG',
  PENGUIN='PENGUIN',
  BALD_EAGLE='BALD_EAGLE'
}

export enum Region {
  NORT_AMERICA='NORT_AMERICA',
  SOUTH_AMERICA='SOUTH_AMERICA',
  AFRICA='AFRICA',
  EUROPE='EUROPE',
  ASIA='ASIA',
  ANTARCTICA='ANTARCTICA',
  AUSTRALIA='AUSTRALIA',
  OCEANIA='OCEANIA'
}

export enum PrimaryStat {
  ATTACK='attack',
  DEFFENCE='deffence',
  SPEED='speed',
  HEAL='heal',
  WEIGHT='weight',
  LIFETIME='lifetime'
}

export enum SecondaryStats {
  ATTACK_BUFF='attackBuff',
  ATTACK_DEBUFF='attackDebuff',
  DAMMAGE_REFLECTION='dammageReflection',
  POISON='poison',
  DEFFENCE_BUFF='deffenceBuff',
  HEAL_BUFF='healBuff'
}

export type PrimaryKeys = Array<keyof PrimaryStat>;

export interface Animal {
  id: string;
  type: AnimalType;
  name: string;
  level: number;
  region: Region;
  primaryStats: { [key in PrimaryStat]?: number };
  secondaryStats: { [key in SecondaryStats]?: number };
}

export interface AnimalDetail extends Animal {
  description?: string;
}

export const animal: AnimalDetail = {
  'id': 'abcd-123d-232d-ed213',
  'type': AnimalType.EXOTIC,
  'name': AnimalName.MUSTANG,
  'level': 2,
  'region': Region.NORT_AMERICA,
  'primaryStats': {'attack': 2},
  'secondaryStats': {'attackBuff': 2},
  'description': 'Lorem ipsum dolar sitamet',
};
