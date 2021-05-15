import React from 'react';

import './product-list.scss';
import { Product } from 'src/store/reducers/ProductReducer';

interface Props {
  list: Product[];
}

export const ProductList = (props: Props): JSX.Element => {
  return (
    <div className="product-list">
      <h1>Products</h1>
      <ul>
        <li>mug</li>
        <li>shirt</li>
      </ul>

      <div>Total: {props.list.length} record(s)</div>
      <div className="product-grid">
        {
          props.list.map((item, key) =>
            <div className="product-item">
              <div className="product-image"/>
              <div className="product-price">₺ {item.price}</div>
              <div key={key} className={'product-name'}>
                {item.name}
              </div>
              <button className="product-add" onClick={()=>console.log('add')}>Add</button>
            </div>,
          )
        }
      </div>
    </div>
  )
}
