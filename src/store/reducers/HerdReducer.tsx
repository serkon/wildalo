import { Herd } from 'src/utils/dto';
import { Action } from 'src/store/store';

export enum HerdEnum {
  SET_HERD_LIST = 'SET_HERD_LIST',
  UPDATE_HERD = 'UPDATE_HERD',
}

export interface HerdReducerState {
  list: Herd[];
  paging: {
    current: number;
    total: number;
    limit: number;
  };
}

const initial: HerdReducerState = {
  list: [],
  paging: {
    current: 0,
    total: 0,
    limit: 0,
  },
};

export const HerdReducer = (state: HerdReducerState = initial, action: Action<any>): HerdReducerState => {
  switch (action.type) {
    case HerdEnum.SET_HERD_LIST: {
      return { ...state, ...action.payload };
    }
    case HerdEnum.UPDATE_HERD: {
      const newList = state.list.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
      return { ...state, list: newList };
    }
    default:
      return state;
  }
};

export const set_herd_list = (payload: HerdReducerState): Action<HerdReducerState> => ({
  type: HerdEnum.SET_HERD_LIST,
  payload,
});

export const update_herd = (payload: Herd): Action<Herd> => ({
  type: HerdEnum.UPDATE_HERD,
  payload,
});
