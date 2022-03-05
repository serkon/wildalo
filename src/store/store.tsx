import { Action, combineReducers, createStore } from 'redux';

import { ProductReducer } from 'src/store/reducers/ProductReducer';
import { CompanyReducer } from 'src/store/reducers/CompanyReducer';
import { BasketReducer } from 'src/store/reducers/BasketReducer';

const combine = combineReducers({
  products: ProductReducer,
  companies: CompanyReducer,
  basket: BasketReducer,

  // 'user': UserReducer,
});
export type CombineType = ReturnType<typeof combine>;
export const store = createStore<CombineType, Action, never, never>(combine);
