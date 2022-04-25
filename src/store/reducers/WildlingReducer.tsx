import { AnyAction, Reducer } from 'redux';
import { Animal, AnimalDetail } from 'src/components/animal/animal.dto';
import { Ranger } from 'src/pages/user/user.dto';
import { Action } from 'src/store/store';

export enum WildlingEnum {
  SET_WILDLING = 'SET_WILDLING',
  UPDATE_WILDLING = 'UPDATE_WILDLING',
  DELETE_WILDLING = 'DELETE_WILDLING',
}

export interface WildlingReducerState {
  wildlings: Animal[] | AnimalDetail[];
}

const init: WildlingReducerState = {
  wildlings: [],
};

export const WildlingReducer: Reducer = (state: WildlingReducerState = init, action): WildlingReducerState => {
  switch (action.type) {
    case WildlingEnum.SET_WILDLING: {
      return { wildlings: action.payload };
    }
    case WildlingEnum.UPDATE_WILDLING: {
      return { ...state, wildlings: action.payload };
    }
    case WildlingEnum.DELETE_WILDLING: {
      return { wildlings: state.wildlings.filter((item: Animal) => item._id !== action.payload._id) };
    }
    default:
      return state;
  }
};

export const set_wildling = (payload: Ranger): AnyAction => ({
  type: WildlingEnum.SET_WILDLING,
  payload,
});

export const update_wildling = (payload: boolean): AnyAction => ({
  type: WildlingEnum.UPDATE_WILDLING,
  payload,
});

export const delete_wildling = (payload: Partial<Record<keyof Ranger, any>>): Action<Partial<Record<keyof Ranger, any>>> => ({
  type: WildlingEnum.DELETE_WILDLING,
  payload,
});
