import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'src/components/error-boundary/ErrorBoundary';
import { Header } from 'src/components/header/Header';
import { useSetTitle } from 'src/index';

import './App.scss';

function App (): JSX.Element {
  useSetTitle('App');
  useEffect(() => {
    console.log('dom update');
  },[]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...!</div>}>
        <div className="app">
          <Header />
          <main className="container">
            <div className="row">
              <div className="col-12">content</div>
            </div>
          </main>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
