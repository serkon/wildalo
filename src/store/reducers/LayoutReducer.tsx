import { Action } from 'src/store/store';

export enum LayoutEnum {
  SET_PLAY_BUTTON = 'SET_PLAY_BUTTON',
}

export interface LayoutReducerState {
  play: boolean;
}

const initial = {
  play: false,
};

export const LayoutReducer = (state: LayoutReducerState = initial, action: Action<any>): LayoutReducerState => {
  switch (action.type) {
    case LayoutEnum.SET_PLAY_BUTTON: {
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
