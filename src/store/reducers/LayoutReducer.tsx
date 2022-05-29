import { Action } from 'src/store/store';

export enum LayoutEnum {
  SET_PLAY_BUTTON = 'SET_PLAY_BUTTON',
  SET_MAINTENANCE = 'SET_MAINTENANCE',
}

export interface LayoutReducerState {
  play: boolean;
  maintenance: boolean;
}

const initial = {
  play: false,
  maintenance: false,
};

export const LayoutReducer = (state: LayoutReducerState = initial, action: Action<any>): LayoutReducerState => {
  switch (action.type) {
    case LayoutEnum.SET_PLAY_BUTTON: {
      return { ...state, play: action.payload };
    }
    case LayoutEnum.SET_MAINTENANCE: {
      return { ...state, play: action.payload };
    }
    default:
      return state;
  }
};

export const set_layout_play_button = (payload: boolean): Action<boolean> => ({
  type: LayoutEnum.SET_PLAY_BUTTON,
  payload,
});

export const set_maintenance = (payload: boolean): Action<boolean> => ({
  type: LayoutEnum.SET_MAINTENANCE,
  payload,
});
