import { useDispatch, useSelector } from 'react-redux';

import './basket-list.scss';
import { CombineType } from 'src/store/store';
import { Card } from 'src/components/card/Card';
import { Basket, decrement_basket_item, increment_basket_item } from 'src/store/reducers/BasketReducer';

export const BasketList = (): JSX.Element => {
  const selector = useSelector((state: CombineType) => state);
  const dispatch = useDispatch();
  return (
    <>
      <Card label={'Basket'} className={'card-bordered'}>
        {
          selector.basket.list.length > 0 ? selector.basket.list.map((item: Basket, key: number) =>
            <div className="basket-item" key={key}>
              <div className="product-info">
                <div className="product-name">{item.product.name}</div>
                <div className="product-price">₺{item.product.price}</div>
              </div>
              <div className="product-counter">
                <button onClick={() => dispatch(decrement_basket_item(item.product))} className="ghost counter-button">-</button>
                <div className="product-count-button">{item.count}</div>
                <button onClick={() => dispatch(increment_basket_item(item.product))} className="ghost counter-button">+</button>
              </div>
            </div>,
          ) : <div>Please, <b>Add</b> items.</div>
        }
        {(selector.basket.list.length) ? <div className="basket-total">₺{selector.basket.total}</div> : null}
      </Card>
    </>
  )
}
