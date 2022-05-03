import { AnyAction, Reducer } from 'redux';
import { Animal, AnimalDetail } from 'src/utils/dto';
import { Action } from 'src/store/store';

export enum WildlingEnum {
  SET_WILDLING_LIST = 'SET_WILDLING_LIST',
  UPDATE_WILDLING_LIST = 'UPDATE_WILDLING_LIST',
  DELETE_WILDLING = 'DELETE_WILDLING',
}

export interface WildlingReducerState {
  list: Animal[] | AnimalDetail[];
}

const init: WildlingReducerState = {
  list: [],
};

export const WildlingReducer: Reducer = (state: WildlingReducerState = init, action): WildlingReducerState => {
  switch (action.type) {
    case WildlingEnum.SET_WILDLING_LIST: {
      return { list: action.payload };
    }
    case WildlingEnum.UPDATE_WILDLING_LIST: {
      return { ...state, list: action.payload };
    }
    case WildlingEnum.DELETE_WILDLING: {
      return { list: state.list.filter((item: Animal) => item._id !== action.payload._id) };
    }
    default:
      return state;
  }
};

export const set_wildling_list = (payload: Animal[]): AnyAction => ({
  type: WildlingEnum.SET_WILDLING_LIST,
  payload,
});

export const update_wildling_list = (payload: Animal[]): AnyAction => ({
  type: WildlingEnum.UPDATE_WILDLING_LIST,
  payload,
});

export const delete_wildling = (payload: Animal): Action<Animal> => ({
  type: WildlingEnum.DELETE_WILDLING,
  payload,
});
