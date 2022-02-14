import { AnyAction, Reducer } from 'redux';

import products from 'src/store/products.json';
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
  products: Product[];
  filtered: Product[];
  tags: string[];
  filter: {
    companies: Company[];
    types: string[];
    tags: string[];
  };
}

const getTags = (): string[] => {
  const tagList: string[] = [];
  const addTagExist = (tags: string[]) => {
    tags.forEach((tag) => {
      if (!tagList.includes(tag)) {
        tagList.push(tag);
      }
    });
  };
  products.forEach((product: Product) => addTagExist(product.tags));
  return tagList;
};

const initialState: ProductState = {
  products,
  'filtered': products,
  'tags': getTags(),
  'filter': {
    'companies': [],
    'types': [],
    'tags': [],
  },
};

const filterAll = (state: ProductState): Product[] => {
  let filtered = state.products;

  // Find Companies
  if (state.filter.companies.length > 0) {
    filtered = state.filter.companies.reduce((total: Product[], company: Company) => [...total, ...filtered.filter((item: Product) => item.manufacturer === company.slug)], []);
  }

  // Find Items
  if (state.filter.types.length > 0) {
    filtered = state.filter.types.reduce((total: Product[], type: string) => [...total, ...filtered.filter((item: Product) => item.itemType === type)], []);
  }

  // Find Tags
  if (state.filter.tags.length > 0) {
    filtered = state.filter.tags.reduce((total: Product[], type: string) => [...total, ...filtered.filter((item: Product) => item.tags.includes(type))], []);
  }
  return filtered;
};

export const ProductReducer: Reducer = (state: ProductState = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'FILTER_PRODUCT_BY_COMPANY_SLUG': {
      state.filter.companies = action.payload;
      const filtered = filterAll(state);
      return { ...state, filtered };
    }
    case 'FILTER_PRODUCT_BY_ITEM_TYPE': {
      state.filter.types = action.payload;
      const filtered = filterAll(state);
      return { ...state, filtered };
    }
    case 'FILTER_PRODUCT_BY_TAGS': {
      state.filter.tags = action.payload;
      const filtered = filterAll(state);
      return { ...state, filtered };
    }
    default:
      return state;
  }
};

export const filter_product_by_company_slug = (payload: Company[]): { type: string; payload: Company[] } => ({
  'type': 'FILTER_PRODUCT_BY_COMPANY_SLUG',
  payload,
});

export const filter_product_by_item_type = (payload: string[]): { type: string; payload: string[] } => ({
  'type': 'FILTER_PRODUCT_BY_ITEM_TYPE',
  payload,
});

export const filter_product_by_tags = (payload: string[]): { type: string; payload: string[] } => ({
  'type': 'FILTER_PRODUCT_BY_TAGS',
  payload,
});
