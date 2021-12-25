import { useState } from 'react';
import { useDispatch } from 'react-redux';

import './product-list.scss';
import { filter_product_by_item_type, Product } from 'src/store/reducers/ProductReducer';
import { add_to_basket } from 'src/store/reducers/BasketReducer';

interface Props {
  list: Product[];
}

export const ProductList = (props: Props): JSX.Element => {
  const itemTypes = ['mug', 'shirt', 'fruit'];
  const [selected, setSelected] = useState<string[]>([]);
  const dispatch = useDispatch();

  const addToBasket = (item: Product) => {
    dispatch(add_to_basket(item));
  };

  const filterByItemType = (type: string) => {
    const found = selected.find(item => item === type);
    (!found) ? selected.push(type) : selected.includes(type) && selected.splice(selected.indexOf(type), 1);
    setSelected([...selected]);
    dispatch(filter_product_by_item_type(selected));
  };

  const isTypeSelected = (type: string) => !!selected.find(item => item === type);

  return (
    <div className="product-list">
      <h1>Products</h1>
      <div className="product-filter-area">
        <div className="item-types">
          {
            itemTypes.map((type, key) =>
              <button
                className={isTypeSelected(type) ? 'selected tag' : 'tag'}
                key={key}
                onClick={filterByItemType.bind(this, type)}
              >
                {type}
              </button>,
            )
          }
        </div>
        <div className="found-count"><b>{props.list.length}</b> record(s) found</div>
      </div>
      {
        props.list.length > 0 &&
        <div className="product-area grid">
          {
            props.list.map((item, key) =>
              <div className="product-item" key={key}>
                <div className="product-image"/>
                <div className="product-price">₺ {item.price}</div>
                <div className={'product-name'}>{item.name}</div>
                <button className="product-add" onClick={() => addToBasket(item)}>Add</button>
              </div>,
            )
          },
        </div>
      }
      {props.list.length == 0 && <div className="product-area">No data were found</div>}
    </div>
  );
};
