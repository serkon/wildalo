import { CombinedState, combineReducers, createStore } from 'redux';

import { MetamaskReducer } from './reducers/MetamaskReducer';
import { RangerReducer } from './reducers/RangerReducer';

export interface Action<T> {
  type: string;
  payload: T;
}

const rootReducer = combineReducers({
  // products: ProductReducer,
  // companies: CompanyReducer,
  // basket: BasketReducer,
  metamask: MetamaskReducer,
  ranger: RangerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const store: CombinedState<any> = createStore<RootState, Action<any>, never, never>(rootReducer);
export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
// store.subscribe(() => console.log(store.getState().user));
