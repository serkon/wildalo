import React, { ForwardedRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import './sorting.scss';

interface SortingProps {
  cases: SortingItem[];
  data?: any;
  onClick?: (item: any[]) => void;
  ref: ForwardedRef<ImperativeHandle>;
}

export interface SortingItem {
  label: string,
  type: string,
  direction: 'asc' | 'desc'
}

export interface ImperativeHandle {
  uncheck: () => void,
}

// export const Sorting = (props: SortingProps): JSX.Element => {
export const Sorting = React.forwardRef<ImperativeHandle, SortingProps>(
  (props, forwardedRef) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const items: SortingItem[] = props.cases;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setSortItem] = useState(items[0]);

    const idGenerator = () => '_' + Math.random().toString(36).substr(2, 9);

    const id = idGenerator();

    const onClick = (item: SortingItem) => {
      setSortItem(item);
      props.onClick && props.onClick(sort(item));
    };

    const sort = (item: SortingItem) => {
      props.data.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[item.type] - b[item.type]);
      if (item.direction === 'desc') {
        props.data.reverse();
      }
      return props.data;
    };

    useEffect(() => {
      // console.log('sort efffecct');
    }, [props.data]);

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(forwardedRef, () => ({
      uncheck () {
        if (inputRef.current?.name) {
          document.getElementsByName(inputRef.current?.name).forEach((item) => (item as HTMLInputElement).checked = false);
        }
      },
    }));

    return (
      <ul className="sorting-list">{
        items.map((item, key) =>
          <li key={key}>
            <input id={`${key}-${id}`} type="radio" name={id} onClick={() => onClick(item)} ref={inputRef}/>
            <label htmlFor={`${key}-${id}`}>{item.label}</label>
          </li>,
        )}
      </ul>
    );
  },
);
