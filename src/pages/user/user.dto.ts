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
  claimableWarcBalance: string;
  claimableFodrBalance: string;
  winScore: number;
  totalScore: number;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  role?: string;
  imageId: string; //random generated avatar1, avatar2*
  walletAddress: string;
}
