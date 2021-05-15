/**
 * Create store
 */
import { Action, combineReducers, createStore } from 'redux';
import { ProductReducer } from 'src/store/reducers/ProductReducer';
import { CompanyReducer } from 'src/store/reducers/CompanyReducer';

const combine = combineReducers({
  products: ProductReducer,
  companies: CompanyReducer,
})
export type CombineType = ReturnType<typeof combine>;
export const store = createStore<CombineType, Action, any, never>(combine);
