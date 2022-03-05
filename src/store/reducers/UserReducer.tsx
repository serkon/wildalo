import { AnyAction, Reducer } from 'redux';
import { User } from 'src/pages/user/user.dto';

export interface Company {
  'slug': string;
  'name': string;
  'address': string;
  'city': string;
  'state': string;
  'zip': string;
  'account': number,
  'contact': string;
}

export const UserReducer: Reducer = (state: User[], action) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.payload;
    }
    default :
      return state;
  }
};

export const setUser = (payload: string[]): AnyAction => ({
  type: 'SET_USER',
  payload,
});
