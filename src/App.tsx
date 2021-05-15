import React from 'react';
import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';

import './App.scss';
import { Header } from 'src/components/header/Header';
import { Card } from 'src/components/card/Card';
import { Sorting } from 'src/components/sorting/Sorting';
import { Filter } from 'src/components/filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { filter_product_by_company_slug, ProductState } from 'src/store/reducers/ProductReducer';
import { Company } from 'src/store/reducers/CompanyReducer';
import { ProductList } from 'src/pages/home/content-area/ProductList';

function App(): JSX.Element {
  const selector = useSelector((state: { products: ProductState, companies: Company[] }) => state);
  const dispatch = useDispatch();
  const filterByTags = (e: any[]) => {
    console.log(e);
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
                  data={['ali', 'veli']}
                  onClick={(e) => filterByTags(e)}
                />
              </Card>
            </div>
            <div className="content-area col-xs-6">
              <ProductList list={selector.products.filtered} />
            </div>
            <div className="basket-area col-xs-3">c</div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;

{
  /*
  <Link to="/">Home</Link>
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route path="/detail:id">Detail</Route>
    </Switch>
  </Suspense>
*/
}
