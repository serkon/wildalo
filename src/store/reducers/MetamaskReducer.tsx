import { Action } from 'src/store/store';

export enum MetamaskEnum {
  SET_METAMASK_WALLET_ADDRESS = 'SET_METAMASK_WALLET_ADDRESS',
  SET_METAMASK_FODR_BALANCE = 'SET_METAMASK_FODR_BALANCE',
  SET_METAMASK_WARC_BALANCE = 'SET_METAMASK_WARC_BALANCE',
  SET_METAMASK_ACCOUNT_ADDRESS = 'SET_METAMASK_ACCOUNT_ADDRESS',
  SET_METAMASK_EXTENSION_STATUS = 'SET_METAMASK_EXTENSION_STATUS',
  SET_METAMASK_NETWORK_STATUS = 'SET_METAMASK_NETWORK_STATUS',
  SET_METAMASK_PERMISSON_STATUS = 'SET_METAMASK_PERMISSON_STATUS',
}

export interface MetamaskReducerState {
  extension: boolean;
  network: boolean;
  permission: boolean;
  walletAddress: string | null;
  fodrBalance: string | null;
  warcBalance: string | null;
}

const init: MetamaskReducerState = {
  extension: false,
  network: false,
  permission: false,
  walletAddress: null,
  fodrBalance: null,
  warcBalance: null,
};

// const status = async (): Promise<MetamaskReducerState> => {
//   const fetch = async () => ({
//     extension: Wildapter.checkMetamask(),
//     connected: await Wildapter.checkConnection(),
//     data: null,
//   });
//   const response = await fetch();
//   console.log(response);
//   return response;
// };
// console.log(status());

export const MetamaskReducer = (state: MetamaskReducerState = init, action: Action<any>): MetamaskReducerState => {
  switch (action.type) {
    case MetamaskEnum.SET_METAMASK_WALLET_ADDRESS: {
      return { ...state, walletAddress: action.payload };
    }
    case MetamaskEnum.SET_METAMASK_FODR_BALANCE: {
      return { ...state, fodrBalance: action.payload };
    }
    case MetamaskEnum.SET_METAMASK_WARC_BALANCE: {
      return { ...state, warcBalance: action.payload };
    }
    case MetamaskEnum.SET_METAMASK_EXTENSION_STATUS: {
      return { ...state, extension: action.payload };
    }
    case MetamaskEnum.SET_METAMASK_NETWORK_STATUS: {
      return { ...state, network: action.payload };
    }
    case MetamaskEnum.SET_METAMASK_PERMISSON_STATUS: {
      return { ...state, permission: action.payload };
    }
    default:
      return state;
  }
};

export const set_metamask_wallet_address = (payload: string | null): Action<string | null> => ({
  type: MetamaskEnum.SET_METAMASK_WALLET_ADDRESS,
  payload,
});

export const set_metamask_fodr_balance = (payload: string | null): Action<string | null> => ({
  type: MetamaskEnum.SET_METAMASK_FODR_BALANCE,
  payload,
});
export const set_metamask_warc_balance = (payload: string | null): Action<string | null> => ({
  type: MetamaskEnum.SET_METAMASK_WARC_BALANCE,
  payload,
});

export const set_metamask_extension_status = (payload: boolean): Action<boolean> => ({
  type: MetamaskEnum.SET_METAMASK_EXTENSION_STATUS,
  payload,
});

export const set_metamask_network_status = (payload: boolean): Action<boolean> => ({
  type: MetamaskEnum.SET_METAMASK_NETWORK_STATUS,
  payload,
});

export const set_metamask_permission_status = (payload: boolean): Action<boolean> => ({
  type: MetamaskEnum.SET_METAMASK_PERMISSON_STATUS,
  payload,
});
