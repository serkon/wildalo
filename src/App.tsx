import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { Header } from 'src/components/header/Header';
import { Card } from 'src/components/card/Card';
import { Sorting, SortingItem } from 'src/components/sorting/Sorting';
import { Filter } from 'src/components/filter/Filter';
import { CombineType } from 'src/store/store';
import {
  filter_product_by_company_slug,
  filter_product_by_tags,
  Product,
} from 'src/store/reducers/ProductReducer';
import { Company } from 'src/store/reducers/CompanyReducer';
import { ProductList } from 'src/pages/home/content-area/ProductList';
import { BasketList } from 'src/pages/home/basket-area/BasketList';
import { useSetTitle } from 'src/index';

function App (): JSX.Element {
  useSetTitle('Serkan Konakcı - Getir.com CodingCase / 505 865 7075');
  const mutableRefObject = useRef<React.ElementRef<typeof Sorting>>(null);
  const selector = useSelector((state: CombineType) => state);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([...selector.products.filtered]);
  const sortingCases: SortingItem[] = [
    { 'label': 'Price low to high', 'type': 'price', 'direction': 'asc' },
    { 'label': 'Price high to low', 'type': 'price', 'direction': 'desc' },
    { 'label': 'New to old', 'type': 'added', 'direction': 'asc' },
    { 'label': 'Old to new', 'type': 'added', 'direction': 'desc' },
  ];

  const filterByTags = (tags: string[]) => {
    dispatch(filter_product_by_tags(tags));
  };

  const filterByCompanies = (companies: Company[] = []) => {
    dispatch(filter_product_by_company_slug(companies));
  };

  const onSorting = (sorting: Product[]) => {
    setProducts([...sorting]);
  };

  const uncheck = () => {
    mutableRefObject.current?.uncheck();
  };

  useEffect(() => {
    uncheck();
    setProducts([...selector.products.filtered]);
  }, [selector.products.filtered]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...!</div>}>
        <div className="app">
          <Header />
          <main className="container">
            <div className="row">
              <div className="filter-area col-xs-3">
                <Card label={'Sort'}>
                  <Sorting
                    onClick={onSorting}
                    data={products}
                    cases={sortingCases}
                    ref={mutableRefObject}
                  />
                </Card>
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
                <ProductList list={products} />
              </div>
              <div className="basket-area col-xs-3">
                <BasketList />
              </div>
            </div>
          </main>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
