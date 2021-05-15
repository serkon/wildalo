interface SortingProps {
}

export const Sorting = (props: SortingProps): JSX.Element => {
  const items = [
    {label: 'Price low to high', type: 'asc'},
    {label: 'Price high to low', type: 'desc'},
    {label: 'New to old', type: 'date'},
    {label: 'Old to new', type: 'date'},
  ];
  return (
    <>
      {items.map(((item,key) => <li key={key}>{item.label}</li>))}
    </>
  )
}
