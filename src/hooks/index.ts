import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { useMediaQuery } from 'src/theme/util/media-query';
import { api, HttpRequest } from 'src/components/axios/axios.component';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export const ScrollTo = ({ position = 0 }: { position?: number }): null => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location, position]);
  return null;
};

export const useSetTitle = (title: string): void => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export const useProcess = () => process.env;

export const useMobile = () => {
  const isDesktop = useMediaQuery('md');
  const root: HTMLDivElement | null = document.getElementById('root') as HTMLDivElement;
  useEffect(() => {
    !isDesktop ? root?.classList.add('mobile') : root?.classList.remove('mobile');
  });
};

// https://stackoverflow.com/a/66650583/2184182
export const useStateWithCallback = <T>(initialState: T): [state: T, setState: (updatedState: React.SetStateAction<T>, callback?: (updatedState: T) => void) => void] => {
  const [state, setState] = useState<T>(initialState);
  const callbackRef = useRef<(updated: T) => void>();
  const handleSetState = (updatedState: React.SetStateAction<T>, callback?: (updatedState: T) => void) => {
    callbackRef.current = callback;
    setState(updatedState);
  };

  useEffect(() => {
    if (typeof callbackRef.current === 'function') {
      callbackRef.current(state);
      callbackRef.current = undefined;
    }
  }, [state]);

  return [state, handleSetState];
};

// https://stackoverflow.com/a/66563682/2184182
type ScheduledCallback = () => void;
export const useScheduleNextRenderCallback = () => {
  const ref = useRef<ScheduledCallback>();

  useEffect(() => {
    if (ref.current !== undefined) {
      ref.current();
      ref.current = undefined;
    }
  });
  const schedule = useCallback((fn: ScheduledCallback) => {
    ref.current = fn;
  }, []);

  return schedule;
};

/**
 * Fetch Hook
 */
export interface UseFetch {
  isLoading: boolean;
  isError: boolean;
  data: any;
}

/**
 * @param params {url: '', method: ''}
 * @param callback
 * @param watch
 * @param condition
 * @returns {isLoading: boolean, isError: boolean, data: any}
 *
 * Usage Example:
 *
 * const { data, isLoading, isError } = useApi(
 *   { url: '/my/animal/fights' },
 *   (data: HttpResponse<FightsOverview>) => {
 *     dispatch(set_ranger(data.data));
 *     setState(data.data);
 *   },
 *   store.metamask.status,
 *   store.metamask.status,
 * );
 */

export const useApi = (
  params: AxiosRequestConfig<HttpRequest<Record<string, any> | any[]>>,
  callback?: (data: any) => void,
  watch: any = null,
  condition: boolean = true,
): UseFetch => {
  const [data, setData] = useState(null);
  const [fetch] = useState({ ...{ url: '', method: 'POST' }, ...params } as AxiosRequestConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    () => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
          const result = await api(fetch);
          setData(result.data);
          callback && callback(result.data);
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };

      condition && fetchData();
    },
    Array.isArray(watch) ? [...watch, fetch] : [watch, fetch],
  );

  return { data, isLoading, isError };
};

export const useConstructor = (callBack: () => void) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

/**
 * This hook is used to debounce the search input or anything like that
 * Usage Example:
 *
 * Add to your component:
 * ```typescript
 * const onKeyPress = (item: any) => {
 *   subject.next(item.target.value);
 * };
 * const { value, setValue, subject } = useObservable((value) => console.log('searching', value));
 * ```
 * Then render in component dom:
 * `return (<div>{value}</div>)`
 *
 * @param callback
 * @param debounce default 500ms
 * @returns
 */

export const useObservable = (callback: (value: any) => void, debounce = 500) => {
  const [value, setValue] = useState('');
  const subject = new Subject<any>();
  const observable = subject.pipe(
    debounceTime(debounce),
    map((value) => value),
  );
  useEffect(() => {
    const subscription = observable.subscribe((value: string) => {
      setValue(value);
      callback(value);
    });
    return () => subscription.unsubscribe();
  }, [observable]);
  return { value, setValue, subject };
};
