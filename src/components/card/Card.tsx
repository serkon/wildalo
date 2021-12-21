import React from 'react';

import './card.scss';

interface Props {
  label: string;
  className?: string;
}

export const Card = (props: React.PropsWithChildren<Props>): JSX.Element => {
  const classes = ['content'];
  if (props.className) {
    classes.push(props.className);
  }
  return (
    <div className="card">
      <div className="label">{props.label}</div>
      <div className={classes.join(' ')}>{props.children}</div>
    </div>
  );
};
