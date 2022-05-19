/**
 * Animal DTOS
 */
export enum AnimalRarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  EXOTIC = 'EXOTIC',
}

export enum AnimalName {
  BLACK_BEAR = 'BLACK_BEAR',
  RACCOON = 'RACCOON',
  MUSTANG = 'MUSTANG',
  AMERICAN_BISON = 'AMERICAN_BISON',
  MOUNTAIN_LION = 'MOUNTAIN_LION',
  HUMMINGBIRD = 'HUMMINGBIRD',
  BALD_EAGLE = 'BALD_EAGLE',
  GREAT_WHITE_SHARK = 'GREAT_WHITE_SHARK',
  ALLIGATOR = 'ALLIGATOR',
  GRAY_WHALE = 'GRAY_WHALE',
  GALAPAGOS_TORTOISE = 'GALAPAGOS_TORTOISE',
  TOUCAN = 'TOUCAN',
  BOA_SNAKE = 'BOA_SNAKE',
  ARMADILLO = 'ARMADILLO',
  LLAMA = 'LLAMA',
  CAPYBARA = 'CAPYBARA',
  PIRANHA = 'PIRANHA',
  TAPIR = 'TAPIR',
  GIANT_ANTEATER = 'GIANT_ANTEATER',
  OCELOT = 'OCELOT',
  WILD_BOAR = 'WILD_BOAR',
  LEMMING = 'LEMMING',
  REINDEER = 'REINDEER',
  BROWN_BEAR = 'BROWN_BEAR',
  GOLDEN_EAGLE = 'GOLDEN_EAGLE',
  HEDGEHOG = 'HEDGEHOG',
  GRASS_SNAKE = 'GRASS_SNAKE',
  ATLANTIC_SALMON = 'ATLANTIC_SALMON',
  OSPREY = 'OSPREY',
  GRAY_WOLF = 'GRAY_WOLF',
  AARDVARK = 'AARDVARK',
  CHEETAH = 'CHEETAH',
  SPOTTED_HYENA = 'SPOTTED_HYENA',
  HIPPOPOTAMUS = 'HIPPOPOTAMUS',
  BLACK_RHINOCEROS = 'BLACK_RHINOCEROS',
  FOREST_ELEPHANT = 'FOREST_ELEPHANT',
  NILE_CROCODILE = 'NILE_CROCODILE',
  BLACK_MAMBA = 'BLACK_MAMBA',
  BARBARY_MACAQUE = 'BARBARY_MACAQUE',
  GIRAFFE = 'GIRAFFE',
  PANGOLINS = 'PANGOLINS',
  BAIKAL_SEAL = 'BAIKAL_SEAL',
  GIANT_PANDA = 'GIANT_PANDA',
  MONGOLIAN_GAZELLE = 'MONGOLIAN_GAZELLE',
  ASIAN_ELEPHANT = 'ASIAN_ELEPHANT',
  SUMATRAN_ORANGUTAN = 'SUMATRAN_ORANGUTAN',
  MANDARIN_DUCK = 'MANDARIN_DUCK',
  KINGFISHER = 'KINGFISHER',
  KING_COBRA = 'KING_COBRA',
  HIMALAYAN_MARMOT = 'HIMALAYAN_MARMOT',
  TASMANIAN_DEVIL = 'TASMANIAN_DEVIL',
  PLATYPUS = 'PLATYPUS',
  KANGAROO = 'KANGAROO',
  WALLABY = 'WALLABY',
  MALLEEFOWL = 'MALLEEFOWL',
  DEATH_ADDER = 'DEATH_ADDER',
  FRUIT_BAT = 'FRUIT_BAT',
  PELICAN = 'PELICAN',
  TREE_FROG = 'TREE_FROG',
  KOALA = 'KOALA',
  KILLER_WHALE = 'KILLER_WHALE',
  ELEPHANT_SEAL = 'ELEPHANT_SEAL',
  EMPEROR_PENGUIN = 'EMPEROR_PENGUIN',
  MACARONI_PENGUIN = 'MACARONI_PENGUIN',
  FUR_SEAL = 'FUR_SEAL',
  SOUTH_POLAR_SKUA = 'SOUTH_POLAR_SKUA',
  WANDERING_ALBATROSS = 'WANDERING_ALBATROSS',
  GENTOO_PENGUIN = 'GENTOO_PENGUIN',
  SNOW_PETREL = 'SNOW_PETREL',
  LEOPARD_SEAL = 'LEOPARD_SEAL',
}

export enum Region {
  NORTH_AMERICA = 'NORTH_AMERICA',
  SOUTH_AMERICA = 'SOUTH_AMERICA',
  AFRICA = 'AFRICA',
  EUROPE = 'EUROPE',
  ASIA = 'ASIA',
  ANTARCTICA = 'ANTARCTICA',
  AUSTRALIA = 'AUSTRALIA',
  OCEANIA = 'OCEANIA',
}

export enum PrimaryStat {
  ATTACK_POWER = 'attackPower',
  DEFENSE = 'defense',
  SPEED = 'speed',
  HEAL_POINT = 'healPoint',
  WEIGHT = 'weight',
  LIFE_SPAN = 'lifeSpan',
}

export enum SecondaryStat {
  ATTACK_BUFF = 'attackBuff',
  ATTACK_DEBUFF = 'attackDebuff',
  DAMAGE_REFLECTION = 'damageReflection',
  POISON = 'poison',
  DEFENSE_BUFF = 'defenseBuff',
  DEFENSE_DEBUFF = 'defenseDebuff',
  HEAL_BUFF = 'healBuff',
  SPEED_BUFF = 'speedBuff',
  SPEED_DEBUFF = 'speedDebuff',
  LIFE_STEAL = 'lifeSteal',
}

export type PrimaryKeys = Array<keyof PrimaryStat>;

export interface Animal {
  _id: string;
  free: boolean;
  rarity: AnimalRarity;
  name: string;
  level: number;
  region: Region;
  primaryStats: { [key in PrimaryStat]?: number };
  secondaryStats: { [key in SecondaryStat]?: number };
  auction?: Auction;
  herdId?: string;
}

export interface AnimalDetail extends Animal {
  description?: string;
}

/**
 * Auction
 */
export interface Auction {
  _id: string;
  remainingTime: number;
}

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
  remainingTime?: number;
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

/**
 * User DTOS
 */
export interface Metamask {
  walletAddress: string;
  fodrBalance: string;
  warcBalance: string;
}

export interface Ranger extends Omit<User, 'password'> {
  power: number;
  level: number;
  claimableWarcBalance: number;
  claimableFodrBalance: number;
  winScore: number;
  totalScore: number;
}

export interface User {
  _id: string;
  username: string;
  password?: string;
  email: string;
  role?: string;
  imageId: string; // random generated avatar1, avatar2*
  walletAddress: string;
}

/**
 * Wallet DTOS
 */

export interface Nounce {
  value: string;
}

/**
 * Http Request & Response DTOS
 */

export interface HttpRequest<T> {
  data: T;
  paging?: { current: number; limit: number };
  sort?: { field: string; order: string }[];
}

export interface HttpResponse<T> {
  data?: T;
  paging?: { current: number; limit: number; total: number };
  message?: Omit<HttpResponseCode, HttpResponseCode.ERROR | HttpResponseCode.OK>;
  status?: HttpResponseCode.ERROR | HttpResponseCode.OK;
}

export enum HttpResponseCode {
  OK = 'true',
  ERROR = 'false',
  USER_NOT_FOUND = '10000',
  USER_NOT_AUTHORIZED = '10001',
  USER_NOT_AUTHENCTICATTED = '10002',
  USER_EXIST = '10003',
  TOKEN_NOT_FOUND = '20000',
  TOKEN_INVALID = '20001',
  TOKEN_EXPIRED = '20002',
  TOKEN_REFRESH_NOT_FOUND = '20003',
  TOKEN_REFRESH_INVALID = '20004',
  TOKEN_REFRESH_EXPIRED = '20005',
  MONGOOSE_ERROR = '30000',
  MONGOOSE_CONNECTION_FAILED = '30001',
  MONGOOSE_NOT_AUTHORIZED = '30002',
  MONGOOSE_TOKEN_SAVE_ERROR = '30003',
  OTHER_ERROR = 'X0000',
}

export enum HttpStatusCode {
  STATUS_200 = 'connected',
  STATUS_201 = 'saved',
  STATUS_202 = 'accepted',
  STATUS_204 = 'updated',
  STATUS_300 = 'multiple choice',
  STATUS_301 = 'moved permanently',
  STATUS_302 = 'found',
  STATUS_303 = 'see other',
  STATUS_304 = 'not modified',
  STATUS_305 = 'use proxy',
  STATUS_307 = 'temporary redirect',
  STATUS_308 = 'permanent redirect',
  STATUS_400 = 'bad request',
  STATUS_401 = 'unauthorized',
  STATUS_403 = 'forbidden',
  STATUS_404 = 'not found',
  STATUS_405 = 'not_allowed',
  STATUS_409 = 'conflict',
  STATUS_412 = 'precondition_failed',
  STATUS_500 = 'internal_server_error',
  STATUS_501 = 'not_implemented',
  STATUS_502 = 'bad_gateway',
  STATUS_503 = 'service_unavailable',
  STATUS_504 = 'timeout',
  STATUS_505 = 'unsupported_version',
  STATUS_506 = 'not_acceptable',
  STATUS_507 = 'insufficient_storage',
  STATUS_508 = 'loop_detected',
  STATUS_510 = 'not_extended',
  STATUS_511 = 'network_authentication_required',
}

/**
 * Filters
 *
 * Usage example:
 * {
 *   data: {
 *     region: "NORTH_AMERICA",
 *     rarity: "COMMON",
 *     level: 1,
 *   },
 * }
 */
export interface WildlingFilter {
  region?: Region;
  rarity?: AnimalRarity;
  level?: number;
  name: string;
}

/**
 * Sorting
 *
 * Usage example:
 * {
 *  sort: { field: "name", order: "asc" }
 * }
 */
export interface WildlingSort {
  field: string; // name, level, rarity,
  order: 'ASC' | 'DESC';
}
