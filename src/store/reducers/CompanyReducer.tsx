import { AnyAction, Reducer } from 'redux';

import data from '../companies.json';

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

export const CompanyReducer: Reducer = (state: Company[] = data, action) => {
  switch (action.type) {
  case 'FILTER_COMPANY_BY_SLUG': {
    return state.reduce((total: Company[], item: Company) => {
      return [...total, ...action.payload.filter((pay: string) => item.slug === pay)];
    }, []);
  }
  default :
    return state
  }
}

export const filter_by_slug = (payload: string[]): AnyAction => {
  return {
    type: 'FILTER_COMPANY_BY_SLUG',
    payload,
  }
}
