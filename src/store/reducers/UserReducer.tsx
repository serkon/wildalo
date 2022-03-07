import { Ranger } from 'src/pages/user/user.dto';
import { Action } from 'src/store/store';

export const UserReducer = (state: Ranger | null = null, action: Action<Ranger>): Ranger | null => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, ... action.payload};
    }
    default :
      return state;
  }
};

export const setUser = (payload: Ranger): Action<Ranger> => ({
  type: 'SET_USER',
  payload,
});

export const updateUser = (payload: Partial<Record<keyof Ranger, any>>): Action<Partial<Record<keyof Ranger, any>>> => ({
  type: 'SET_USER',
  payload,
});
