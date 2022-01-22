import React, { Suspense } from 'react';

export const LanguageContext = React.createContext<{
  tState: State;
  tChange: (language: string) => Promise<void>;
  t: (key: string, params?: any) => string;
}>({
  'tState': { 'language': 'tr', 'content': {}, 'status': false },
  'tChange': () => new Promise((resolve) => resolve()),
  't': () => '',
});

interface Props {}

interface State {
  language: string;
  content: { [key: string]: string };
  status: boolean;
}

export class Language extends React.Component<Props, State> {
  content: { [key: string]: string } = {};
  static contextType = LanguageContext; // alternatif: LanguageContext.contextType = SampleContext;
  state: State = { 'language': 'en', 'content': {}, 'status': false };

  componentDidMount() {
    this.changeLanguage();
  }

  changeLanguage = async (language = 'en') => {
    let content: any;

    this.setState(
      // previous, props of the state also accessible in function parameter:
      // `(previousState, props) => ({status: false})`
      () => ({ 'status': false }),
      async () => {
        content = await import(`./languages/${language}.json`);
        this.setState({ language, content, 'status': true }, () => ({
          language,
          content,
          'status': true,
        }));
      },
    );
  };

  translate = (key: string, params?: any) => {
    let text = Language.getObjectPathValue(this.state.content, key) || key;
    const type = params !== null && typeof params !== 'undefined' ? params.constructor.name : null;
    if (type === 'Array') {
      params.forEach((param: any, paramIndex: number) => {
        text = text.replace(new RegExp(`{${paramIndex}}`, 'g'), param);
      });
    } else if (type === 'Object') {
      Object.keys(params).forEach((keyName: string) => {
        text = text.replace(new RegExp(`{${keyName}}`, 'g'), params[keyName]);
      });
    }
    return text;
  };

  /**
   * Get value by given path of object
   * @example
   * var m = {a: {b:1, c: {d: {e: [1,2,3]}}}}
   * Util.getObjectPathValue(m, "a.c.d.e") // result is (3) [1, 2, 3]
   * @param value - The object from which to import data
   * @param path - String path of the target property
   */
  static getObjectPathValue(value: any, path: string) {
    // console.log('getObject: ', value, path);
    let data = value;
    if (path) {
      path = path.toString();
      path.split('.').forEach((val: any) => {
        data = data !== null && typeof data !== 'undefined' ? data[val] : null;
      });
    }
    return data;
  }

  render(): JSX.Element {
    return (
      <LanguageContext.Provider
        value={{
          'tState': this.state,
          'tChange': (language: string) => this.changeLanguage(language),
          't': this.translate,
        }}>
        <Suspense fallback={<div>{this.translate('loading')}</div>}>{this.state.status && <>{this.props.children}</>}</Suspense>
      </LanguageContext.Provider>
    );
  }
}

export const useTranslate = () => React.useContext(LanguageContext);
