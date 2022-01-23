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
  NORTH_AMERICA='NORTH_AMERICA',
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
  DAMAGE_REFLECTION='damageReflection',
  POISON='poison',
  DEFENSE_BUFF='defenseBuff',
  DEFENSE_DEBUFF='defenseDebuff',
  HEAL_BUFF='healBuff',
  SPEED_BUFF='speedBuff',
  SPEED_DEBUFF='speedDebuff',
  LIFE_STEAL='lifeSteal',
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
