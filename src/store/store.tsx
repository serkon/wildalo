import { CombinedState, combineReducers, createStore } from 'redux';

import { ProductReducer } from 'src/store/reducers/ProductReducer';
import { CompanyReducer } from 'src/store/reducers/CompanyReducer';
import { BasketReducer } from 'src/store/reducers/BasketReducer';
import { UserReducer } from 'src/store/reducers/UserReducer';

export interface Action<T> {
  type: string;
  payload: T;
}

const rootReducer = combineReducers({
  products: ProductReducer,
  companies: CompanyReducer,
  basket: BasketReducer,
  user: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const store:CombinedState<any> = createStore<RootState, Action<any>, never, never>(rootReducer);
export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>
store.subscribe(() => console.log(store.getState().user));
