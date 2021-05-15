import React from 'react';

import './header.scss';
import logo from 'src/assets/Logo.svg';
import { BasketSummary } from 'src/components/basket/summary/BasketSummary';

export const Header = (): JSX.Element => {
  return (
    <header>
      <div className="container header">
        <h1><img src={logo} alt="Market"/></h1>
        <BasketSummary/>
      </div>
    </header>
  )
}
