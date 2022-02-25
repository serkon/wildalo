/**
 * Default user dto
 */
export interface User {
  id: string;
  name?: string;
  surname?: string;
  username: string;
  password: string;
  email: string;
  role?: string;
  image: string;
}

/**
 * Ranger DTOS
 */
export interface Ranger extends Omit<User, 'password'> {
  claimableWarcBalance: string;
  claimableFodrBalance: string;
  metamask?: Metamask;
}

export interface Metamask {
  walletAddress: string;
  fodrBalance: string;
  warcBalance: string;
}
