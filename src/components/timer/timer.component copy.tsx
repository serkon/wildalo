import { useEffect } from 'react';
import { useStateWithCallback } from 'src/hooks';

interface State {
  'hours': number;
  'minutes': number;
  'seconds': 0;
}

interface Props {
  date: Date;
  onChange?: (arg: State | { elapsed: string }) => void;
  onComplete?: () => void;
}

/**
 * Timer component that counts down to a given date1
 *
 * @param date - Date object
 * @param onChange - Callback function
 * @param onComplete - Callback function
 *
 * Usage example:
 * <Timer date={new Date('2022-02-20 02:58')} onChange={(ddd) => console.log('d: ', ddd)} />
 *
 * @returns JSX.Element
 */
export const Timer = (props: Props) => {
  const [time, setTime] = useStateWithCallback({ 'days': 0, 'hours': 0, 'minutes': 0, 'seconds': 0 });
  const givenTime = new Date(props.date);
  const nowTime = new Date();
  const diffTime = givenTime.getTime() - nowTime.getTime();
  const dhm = (ms: number) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const seconds = Math.floor(minutesms / 1000);
    return { days, hours, minutes, seconds };
  };
  const formatNumber = (num: any) =>
    num.toLocaleString('en-US', {
      'minimumIntegerDigits': 2,
      'useGrouping': false,
    });
  const clear = (interval: NodeJS.Timer) => {
    clearInterval(interval);
    props.onComplete && props.onComplete();
  };
  const control = (value: any) => {
    const cond = value.days > 0 && value.hours <= 0 && value.minutes <= 0 && value.seconds <= 0;
    console.log(cond);
    if (cond) {
      value.hours += 24;
      value.days--;
      value.days < 0 && (value.days = 0);
    }
    if (value.minutes < 0) {
      value.minutes = 60 + value.minutes;
      value.hours--;
    }
    if (value.seconds < 0) {
      value.seconds += 60;
      value.minutes--;
    }
    if (value.seconds < 0) {
      value.seconds = 59;
      value.minutes--;
    }
    if (value.minutes < 0) {
      value.minutes = 59;
      value.seconds = 59;
      value.hours--;
    }
    return value;
  };
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (diffTime < 0) {
      props.onComplete && props.onComplete();
    } else {
      const variable = dhm(diffTime);
      control(variable);
      if (variable.hours >= 0 && variable.minutes >= 0 && variable.seconds >= 0) {
        interval = setInterval(() => {
          variable.seconds--;
          control(variable);
          if (variable.hours <= 0 && variable.minutes <= 0 && variable.seconds <= 0) {
            clear(interval);
          }
          // Created custom hook to set state with callback. This is a workaround for the problem of setState not working with useCallback.
          setTime(
            {
              'days': formatNumber(variable.days),
              'hours': formatNumber(variable.hours),
              'minutes': formatNumber(variable.minutes),
              'seconds': formatNumber(variable.seconds),
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_state: typeof time) => {
              // eslint-disable-next-line no-mixed-operators
              props.onChange && props.onChange({ ..._state, 'elapsed': `${formatNumber(variable.hours)}:${formatNumber(variable.minutes)}:${formatNumber(variable.seconds)}` });
            },
          );
        }, 1000);
      }
    }
    return () => clear(interval);
  }, []);

  return (
    <div className="timer">
      <div className="timer-content">
        <div className="timer-content-text">
          <span className="timer-content-text-title">{JSON.stringify(time)}</span>
          <span className="timer-content-text-subtitle"> until the next fight</span>
        </div>
      </div>
    </div>
  );
};
