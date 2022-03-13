import { Metamask } from 'src/pages/user/user.dto';
import { Action } from 'src/store/store';

export enum MetamaskEnum {
  SET_METAMASK = 'SET_METAMASK',
  SET_METAMASK_DATA = 'SET_METAMASK_DATA',
  UPDATE_METAMASK = 'UPDATE_METAMASK',
  SET_EXTENSION_STATUS = 'SET_EXTENSION_STATUS',
  SET_CONNECTED_STATUS = 'SET_CONNECTED_STATUS',
}

export interface MetamaskReducerState {
  extension: boolean;
  connected: boolean;
  data: Metamask | null;
}

const init: MetamaskReducerState = {
  extension: false,
  connected: false,
  data: null,
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
    case MetamaskEnum.SET_METAMASK: {
      return { ...state, ...action.payload };
    }
    case MetamaskEnum.SET_METAMASK_DATA: {
      return { ...state, data: action.payload };
    }
    case MetamaskEnum.UPDATE_METAMASK: {
      return { ...state, data: { ...state.data, ...action.payload } };
    }
    case MetamaskEnum.SET_EXTENSION_STATUS: {
      return { ...state, extension: action.payload };
    }
    case MetamaskEnum.SET_CONNECTED_STATUS: {
      return { ...state, connected: action.payload };
    }
    default:
      return state;
  }
};

export const set_user_metamask = (payload: MetamaskReducerState): Action<MetamaskReducerState> => ({
  type: MetamaskEnum.SET_METAMASK,
  payload,
});

export const set_user_metamask_data = (payload: Metamask | null): Action<Metamask | null> => ({
  type: MetamaskEnum.SET_METAMASK_DATA,
  payload,
});

export const set_extension_status = (payload: boolean): Action<boolean> => ({
  type: MetamaskEnum.SET_EXTENSION_STATUS,
  payload,
});

export const set_connected_status = (payload: boolean): Action<boolean> => ({
  type: MetamaskEnum.SET_CONNECTED_STATUS,
  payload,
});
