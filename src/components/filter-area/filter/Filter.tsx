import React, { useEffect, useRef, useState } from 'react';

import './filter.scss';

interface FilterProps {
  placeholder: string;
  path?: string;
  data?: any[] | null;
  debounce?: number;
  onClick?: (items: any[]) => void;
}

export const Filter = (props: FilterProps): JSX.Element => {
  let timeout: number;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {data, placeholder, path, debounce} = props;
  const [filtered, setFiltered] = useState(data || []);
  const [selected, setSelected] = useState<any[]>([]);

  const filter = () => {
    const value = inputRef.current?.value;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (typeof (value) === 'string' && value?.length >= 0) {
        const found = data?.filter((item) => (path ? item[path] : item).includes(value)) || [];
        setFiltered(found);
      }
    }, debounce || 800);
  }

  const pushSelected = (item: any) => {
    const foundItem = selected.find((s) => s === item);
    let list = [...selected];
    (foundItem) ?
      list = list.filter((s) => s !== foundItem) :
      list.push(item as never);
    setSelected(list);
  }

  useEffect(() => {
    console.log('selected: ', selected);
    props.onClick && props.onClick(selected);
  }, [selected])

  return (
    <>
      <input ref={inputRef} onChange={filter} className="filter" placeholder={placeholder}/>
      <ul>
        {filtered?.map((item, key) => <li key={key} onClick={() => pushSelected(item)}>{path ? item[path] : item}</li>)}
      </ul>
    </>
  )
}
