declare module 'react-router-dom';

// In typings.d.ts(is Global)
export declare global {
  interface Window {
    getVersion: () => any;
    ethereum;
    web3;
    wildapter: MetamaskContractAdaptor;
  }
}
