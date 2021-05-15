import React from 'react';

import './sorting.scss';

export const Sorting = (): JSX.Element => {
  const items = [
    {label: 'Price low to high', type: 'asc'},
    {label: 'Price high to low', type: 'desc'},
    {label: 'New to old', type: 'date'},
    {label: 'Old to new', type: 'date'},
  ];

  const idGenerator = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const id = idGenerator();

  return (
    <ul className="sorting-list">{
      items.map((item, key) =>
        <li key={key}>
          <input id={`${key}-${id}`} type="radio" name={id} onChange={() => console.log(item)}/>
          <label htmlFor={`${key}-${id}`}>{item.label}</label>
        </li>,
      )}
    </ul>
  )
}
