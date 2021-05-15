import { AnyAction, Reducer } from 'redux';

import products from '../products.json';
import { Company } from 'src/store/reducers/CompanyReducer';

export interface Product {
  'tags': string[];
  'price': number;
  'name': string;
  'description': string;
  'slug': string;
  'added': number;
  'manufacturer': string;
  'itemType': string;
}

export interface ProductState {
  products: Product[],
  filtered: Product[]
}

export const ProductReducer: Reducer = (state: ProductState = {products, filtered: products}, action: AnyAction) => {
  switch (action.type) {
  case 'FILTER_PRODUCT_BY_COMPANY_SLUG': {
    const companies = action.payload;
    const matched = companies.reduce((total: Product[], company: Company) => {
      return [...total, ...products.filter((item: Product) => item.manufacturer === company.slug)];
    }, []);
    return {...state, filtered: (companies.length > 0) ? matched : products}
  }
  default :
    return state;
  }
}

export const filter_product_by_company_slug = (payload: Company[]): { type: string, payload: Company[] } => {
  return {
    type: 'FILTER_PRODUCT_BY_COMPANY_SLUG',
    payload,
  }
}

