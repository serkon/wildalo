import { Herd } from 'src/utils/dto';
import { Action } from 'src/store/store';

export enum HerdEnum {
  SET_HERD_LIST = 'SET_HERD_LIST',
  UPDATE_HERD = 'UPDATE_HERD',
}

export interface HerdReducerState {
  list: Herd[];
}

const initial = {
  list: [],
};

export const HerdReducer = (state: HerdReducerState = initial, action: Action<any>): HerdReducerState => {
  switch (action.type) {
    case HerdEnum.SET_HERD_LIST: {
      return { ...state, list: action.payload };
    }
    case HerdEnum.UPDATE_HERD: {
      console.log('update herd: ', action.payload);
      const newList = state.list.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
      console.log(newList);
      return {
        ...state,
        list: newList,
      };
    }
    default:
      return state;
  }
};

export const set_herd_list = (payload: Herd[]): Action<Herd[]> => ({
  type: HerdEnum.SET_HERD_LIST,
  payload,
});

export const update_herd = (payload: Herd): Action<Herd> => ({
  type: HerdEnum.UPDATE_HERD,
  payload,
});
