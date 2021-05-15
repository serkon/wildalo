import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { Header } from 'src/components/header/Header';
import { Card } from 'src/components/card/Card';
import { Sorting } from 'src/components/sorting/Sorting';
import { Filter } from 'src/components/filter/Filter';
import { CombineType } from 'src/store/store';
import { filter_product_by_company_slug, filter_product_by_tags } from 'src/store/reducers/ProductReducer';
import { Company } from 'src/store/reducers/CompanyReducer';
import { ProductList } from 'src/pages/home/content-area/ProductList';
import { BasketList } from 'src/pages/home/basket-area/BasketList';

function App(): JSX.Element {
  const selector = useSelector((state: CombineType) => state);
  const dispatch = useDispatch();

  const filterByTags = (tags: string[]) => {
    console.log(tags);
    dispatch(filter_product_by_tags(tags))
  }

  const filterByCompanies = (companies: Company[] = []) => {
    dispatch(filter_product_by_company_slug(companies))
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <Header/>
        <main className="container">
          <div className="row">
            <div className="filter-area col-xs-3">
              <Card label={'Sort'}><Sorting/></Card>
              <Card label={'Brands'}>
                <Filter
                  placeholder={'Search brand'}
                  data={selector.companies}
                  path={'name'}
                  onClick={(company: Company[]) => filterByCompanies(company)}
                />
              </Card>
              <Card label={'Tags'}>
                <Filter
                  placeholder={'Search tag'}
                  data={selector.products.tags}
                  onClick={(tags: string[]) => filterByTags(tags)}
                />
              </Card>
            </div>
            <div className="content-area col-xs-6">
              <ProductList list={selector.products.filtered}/>
            </div>
            <div className="basket-area col-xs-3">
              <BasketList/>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
