import { AnyAction, Reducer } from 'redux';

import { Product } from 'src/store/reducers/ProductReducer';

export interface Basket {
  product: Product,
  count: number
}

export interface BasketState {
  list: Basket[],
  total: number;
}

const initialBasketState = {
  'list': [],
  'total': 0,
};

export const BasketReducer: Reducer = (state: BasketState = initialBasketState, action) => {
  const found: Basket | undefined = state.list.find(item => action.payload === item.product);
  const calculatePrice = () => {
    const total: number = state.list.reduce((total: number, item) => total + (item.product.price * item.count), 0);
    state.total = Number(total.toFixed(2));
  };
  switch (action.type) {
  case 'ADD_TO_BASKET': {
    (found) ? found.count = found.count + 1 : state.list.push({'product': action.payload, 'count': 1});
    calculatePrice();
    return {...state};
  }
  case 'INCREMENT_BASKET_ITEM': {
    if (found) {
      found.count = found.count + 1;
      calculatePrice();
      console.log('incfremen', state);
    }
    return {...state};
  }
  case 'DECREMENT_BASKET_ITEM': {
    if (found) {
      if (found.count > 1) {
        found.count = found.count - 1;
      } else {
        state.list = state.list.filter((s) => s !== found);
      }
      calculatePrice();
    }

    return {...state};
  }
  default:
    return state;
  }
};

export const add_to_basket = (payload: Product): AnyAction => ({
    'type': 'ADD_TO_BASKET',
    payload,
  });

export const increment_basket_item = (payload: Product): AnyAction => ({
    'type': 'INCREMENT_BASKET_ITEM',
    payload,
  });

export const decrement_basket_item = (payload: Product): AnyAction => ({
    'type': 'DECREMENT_BASKET_ITEM',
    payload,
  });
