import { AnyAction, Reducer } from 'redux';
import { Fight, FightsOverview } from 'src/utils/dto';
import { Action } from 'src/store/store';

export enum FightEnum {
  SET_FIGHT_LIST = 'SET_FIGHT_LIST',
  SET_TOTAL_SCORE = 'SET_TOTAL_SCORE',
  SET_TRESHOLD = 'SET_TRESHOLD',
  SET_WIN_SCORE = 'SET_WIN_SCORE',
  SET_FIGHT_OVERVIEW = 'SET_FIGHT_OVERVIEW',
}

const init: FightsOverview = {
  fights: [],
  totalScore: 0,
  treshold: 0,
  winScore: 0,
};

export const FightReducer: Reducer = (state: FightsOverview = init, action: AnyAction): FightsOverview => {
  switch (action.type) {
    case FightEnum.SET_FIGHT_LIST: {
      return { ...state, fights: action.payload };
    }
    case FightEnum.SET_TOTAL_SCORE: {
      return { ...state, totalScore: action.payload };
    }
    case FightEnum.SET_TRESHOLD: {
      return { ...state, treshold: action.payload };
    }
    case FightEnum.SET_WIN_SCORE: {
      return { ...state, winScore: action.payload };
    }
    case FightEnum.SET_FIGHT_OVERVIEW: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export const set_fight_list = (payload: Fight[]): Action<Fight[]> => ({
  type: FightEnum.SET_FIGHT_LIST,
  payload,
});

export const set_total_score = (payload: number): Action<number> => ({
  type: FightEnum.SET_TOTAL_SCORE,
  payload,
});

export const set_treshold = (payload: number): Action<number> => ({
  type: FightEnum.SET_TRESHOLD,
  payload,
});

export const win_score = (payload: number): Action<number> => ({
  type: FightEnum.SET_WIN_SCORE,
  payload,
});

export const set_fights_overview = (payload: FightsOverview): Action<FightsOverview> => ({
  type: FightEnum.SET_FIGHT_OVERVIEW,
  payload,
});
