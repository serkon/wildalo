import { useEffect } from 'react';
import { useStateWithCallback } from 'src/hooks';

interface State {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
  elapsed: string | null;
}

interface Props {
  date: Date;
  day?: boolean;
  children?: React.ReactNode;
  onChange?: (arg: State) => void;
  onComplete?: (arg: State) => void;
}

const formatNumber = (num: any) =>
  num.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

/**
 * Timer component that counts down to a given date1
 *
 * @param date - Date object
 * @param day - Boolean
 * @param onChange - Callback function
 * @param onComplete - Callback function
 *
 * Usage example:
 * <Timer date={new Date('2022-02-20 02:58')} onChange={(ddd) => console.log('d: ', ddd)} />
 *
 * @returns JSX.Element
 */
export const Timer = (props: Props) => {
  const [time, setTime] = useStateWithCallback<State>({
    days: formatNumber(0),
    hours: formatNumber(0),
    minutes: formatNumber(0),
    seconds: formatNumber(0),
    ms: formatNumber(0),
    elapsed: null,
  });
  const givenTime = new Date(props.date);
  const nowTime = new Date();
  const diffTime = givenTime.getTime() - nowTime.getTime();
  const calculate = (ms: number) => {
    const days = formatNumber(Math.floor(ms / (24 * 60 * 60 * 1000)));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = formatNumber(Math.floor(daysms / (60 * 60 * 1000)));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = formatNumber(Math.floor(hoursms / (60 * 1000)));
    const minutesms = ms % (60 * 1000);
    const seconds = formatNumber(Math.floor(minutesms / 1000));

    return { days, hours, minutes, seconds, ms };
  };
  const clear = (interval: NodeJS.Timer) => {
    clearInterval(interval);
    props.onComplete && props.onComplete(time);
    console.log('clear me');
  };

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (diffTime < 0) {
      props.onComplete && props.onComplete(time);
    } else {
      const variable = calculate(diffTime);

      interval = setInterval(() => {
        if (variable.ms - 1000 <= 0) {
          clear(interval);
        } else {
          variable.ms -= 1000;

          // Created custom hook to set state with callback. This is a workaround for the problem of setState not working with useCallback.
          setTime(
            { ...calculate(variable.ms), elapsed: `${formatNumber(variable.hours)}:${formatNumber(variable.minutes)}:${formatNumber(variable.seconds)}` },
            (_state: typeof time) => {
              props.onChange && props.onChange(_state);
            },
          );
        }
      }, 1000);
    }

    return () => clear(interval);
  }, []);

  return (
    <div className="timer">
      {!props.children ? (
        <>
          {props.day && (
            <>
              <span className="day">{time.days}</span>
              <span className="separator">:</span>
            </>
          )}
          <span className="hour">{time.hours}</span>
          <span className={'separator'}>:</span>
          <span className="minute">{time.minutes}</span>
          <span className={time.seconds % 2 ? 'separator blink' : 'separator'}>:</span>
          <span className="second">{time.seconds}</span>
        </>
      ) : (
        props.children
      )}
    </div>
  );
};

Timer.defaultProps = {
  day: false,
};
