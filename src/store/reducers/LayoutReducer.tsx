import { Action } from 'src/store/store';

export enum LayoutEnum {
  SET_PLAY_BUTTON = 'SET_PLAY_BUTTON',
  SET_MAINTENANCE = 'SET_MAINTENANCE',
  IS_PLAYABLE = 'IS_PLAYABLE',
  IS_DESKTOP = 'IS_DESKTOP',
}

export interface LayoutReducerState {
  playButton: boolean; // is the play button visible
  maintenance: boolean; // is the game in maintenance mode
  isPlayable: boolean; // is the game playable
  isDesktop: boolean; // is the game in desktop mode
}

const initial = {
  playButton: false,
  // TODO (maintenance): uncomment below when maintenance is ready
  maintenance: false,
  isPlayable: false,
  isDesktop: false,
};

export const LayoutReducer = (state: LayoutReducerState = initial, action: Action<any>): LayoutReducerState => {
  switch (action.type) {
    case LayoutEnum.SET_PLAY_BUTTON: {
      return { ...state, playButton: action.payload };
    }
    case LayoutEnum.SET_MAINTENANCE: {
      return { ...state, maintenance: action.payload };
    }
    case LayoutEnum.IS_PLAYABLE: {
      return { ...state, isPlayable: action.payload };
    }
    case LayoutEnum.IS_DESKTOP: {
      return { ...state, isDesktop: action.payload };
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

export const set_playable = (payload: boolean): Action<boolean> => ({
  type: LayoutEnum.IS_PLAYABLE,
  payload,
});

export const set_desktop = (payload: boolean): Action<boolean> => ({
  type: LayoutEnum.IS_DESKTOP,
  payload,
});
