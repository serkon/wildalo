import React from 'react';

import './card.scss';

interface Props {
  label: string;
}

export const Card = (props: React.PropsWithChildren<Props>): JSX.Element => {
  return (
    <div className="card">
      <div className="label">{props.label}</div>
      <div className="content">
        {props.children}
      </div>
    </div>
  )
}
