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
