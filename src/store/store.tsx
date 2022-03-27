import { applyMiddleware, CombinedState, combineReducers, createStore } from 'redux';

import { MetamaskReducer } from './reducers/MetamaskReducer';
import { LayoutReducer } from './reducers/LayoutReducer';
import { RangerReducer } from './reducers/RangerReducer';

export interface Action<T> {
  type: string;
  payload: T;
}

const rootReducer = combineReducers({
  // products: ProductReducer,
  // basket: BasketReducer,
  layout: LayoutReducer,
  metamask: MetamaskReducer,
  ranger: RangerReducer,
});

const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  // console.log('dispatching', action);
  // OKU: https://redux.js.org/tutorials/fundamentals/part-6-async-logic
  storeAPI;
  const result = next(action);
  // console.log('next state', storeAPI.getState());
  return result;
};

export type RootState = ReturnType<typeof rootReducer>;
export const store: CombinedState<any> = createStore(rootReducer, applyMiddleware(loggerMiddleware));
export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
// store.subscribe(() => console.log(store.getState().user));
