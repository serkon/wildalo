import { useEffect, useRef, useState } from 'react';

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
  const [init, setInit] = useState<boolean>(false);
  const idGenerator = () => '_' + Math.random().toString(36).substr(2, 9);
  const filter = () => {
    const value = inputRef.current?.value;

    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (typeof (value) === 'string' && value?.length >= 0) {
        const found = data?.filter((item) => (path ? item[path] : item).toLowerCase().includes(value.toLowerCase())) || [];

        setFiltered(found);
      }
    }, debounce || 800);
  };
  const pushSelected = (item: any) => {
    const foundItem = selected.find((s) => s === item);
    let list = [...selected];

    (foundItem) ?
      list = list.filter((s) => s !== foundItem) :
      list.push(item as never);
    setSelected(list);
    setInit(true);
  };
  const isSelected = (item: any): boolean => !!selected.find(s => item === s);

  useEffect(() => {
    if (init) {
      props.onClick && props.onClick(selected);
    }
  }, [init, props, selected]);

  const id = idGenerator();

  return (
    <>
      <input ref={inputRef} onChange={filter} className="filter" placeholder={placeholder} />
      <ul className="filter-list">
        {
          filtered?.map((item, key) =>
            <li key={key}>
              <input id={`${key}-${id}`} type="checkbox" onChange={() => pushSelected(item)} checked={isSelected(item)} />
              <label htmlFor={`${key}-${id}`}>{path ? item[path] : item}</label>
            </li>,
          )
        }
      </ul>
    </>
  );
};
