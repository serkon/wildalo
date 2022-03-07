import React, { useEffect, useRef } from 'react';
import './pie.component.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: string | number;
  height?: string;
  width?: string;
  startColor?: string;
  endColor?: string;
  borderColor?: string;
  startOpacity?: number;
  endOpacity?: number;
  description?: string;
  children?: React.ReactNode;
}

const countCircle = (element: HTMLDivElement, counter = 100) => {
  let i = 0;
  const time = 750;
  counter = Math.floor(counter);
  const intervalTime = Math.abs(time / (counter > 0 ? counter : 1));
  const timerID = setInterval(() => {
    if (i !== Math.floor(counter)) {
      i++;
      element.innerHTML = i.toString();
    } else {
      element.innerHTML = counter.toString();
      clearInterval(timerID);
    }
  }, intervalTime);
};

// <NEWPROPS extends Props & React.HTMLAttributes<HTMLDivElement>> ya da <NEWPROPS extends Props>
export const ChartPie = <NEWPROPS extends Props>({
  data = 0,
  height = '200px',
  width = '200px',
  startColor = '#5FB1DF',
  endColor = '#80DF5F',
  borderColor = 'rgba(255,255,255,0.3)',
  startOpacity = 0.4,
  endOpacity = 1,
  description = '',
  children,
  ...props
}: NEWPROPS): JSX.Element => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      countCircle(divRef.current, Number(data));
    }
  }, [data]);

  return (
    <div className="pie-chart" {...props}>
      <div className="dot" />
      <svg viewBox="0 0 36 36" className="circular-chart orange" width={width} height={height}>
        <defs>
          <linearGradient id="gradient">
            <stop offset="0" stopColor={startColor} stopOpacity={startOpacity} />
            <stop offset="100%" stopColor={endColor} stopOpacity={endOpacity} />
          </linearGradient>
        </defs>
        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ stroke: borderColor }} />
        <path className="circle" strokeDasharray={`${data}, 100`} stroke="url(#gradient)" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      </svg>
      <div className="title">
        {!children ? (
          <div className="title">
            <div className="title-info">
              <span className="title-data" ref={divRef}>
                {data}
              </span>
              <span className="title-percent">%</span>
            </div>
            <div className="title-description">{description}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
