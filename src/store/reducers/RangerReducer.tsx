import { AnyAction, Reducer } from 'redux';
import { Ranger } from 'src/utils/dto';
import { Action } from 'src/store/store';

export enum RangerEnum {
  SET_RANGER = 'SET_RANGER',
  UPDATE_RANGER = 'UPDATE_RANGER',
  SET_USER_LOGIN = 'SET_USER_LOGIN',
}

export interface RangerReducerState {
  login: boolean;
  data: Ranger | null;
}

const init: RangerReducerState = {
  login: false,
  data: null,
};

export const RangerReducer: Reducer = (state: RangerReducerState = init, action): RangerReducerState => {
  switch (action.type) {
    case RangerEnum.SET_RANGER: {
      return { ...state, data: action.payload };
    }
    case RangerEnum.SET_USER_LOGIN: {
      return { ...state, login: action.payload };
    }
    case RangerEnum.UPDATE_RANGER: {
      return { ...state, data: { ...state.data, ...action.payload } };
    }
    default:
      return state;
  }
};

export const set_ranger = (payload: Ranger): AnyAction => ({
  type: RangerEnum.SET_RANGER,
  payload,
});

export const set_user_login = (payload: boolean): AnyAction => ({
  type: RangerEnum.SET_USER_LOGIN,
  payload,
});

export const update_ranger = (payload: Partial<Record<keyof Ranger, any>>): Action<Partial<Record<keyof Ranger, any>>> => ({
  type: RangerEnum.UPDATE_RANGER,
  payload,
});
