import { useSelector } from 'react-redux';

import './basket-summary.scss';
import { CombineType } from 'src/store/store';

export const BasketSummary = (): JSX.Element => {
  const selector = useSelector((state: CombineType) => state);
  return (
    <div className="basket-summary">
      <span className="icon"/>
      <span className="price">₺{selector.basket.total}</span>
    </div>
  )
}
