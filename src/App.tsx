import React from 'react';

import './App.scss';
import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { Header } from 'src/components/header/Header';
import { Card } from 'src/components/card/Card';
import { Sorting } from 'src/components/filter-area/sorting/Sorting';
import { Filter } from 'src/components/filter-area/filter/Filter';

function App(): JSX.Element {
  // TODO: bu filter call edildiğinde reducer'a gidip state'i update edip güncel
  // datayı Filter bileşenine verecek
  const filterTag = (e: any[]) => {
    console.log(e);
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
                  data={[{yol: 'istanbul'}, {yol: 'ankara'}, {yol: 'corum'}]}
                  path={'yol'}
                />
              </Card>
              <Card label={'Tags'}>
                <Filter
                  placeholder={'Search tag'}
                  data={['ali', 'veli']}
                  onClick={(e) => filterTag(e)}
                />
              </Card>
            </div>
            <div className="content-area col-xs-6">b</div>
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
