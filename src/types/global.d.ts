declare module 'react-router-dom';

// In typings.d.ts(is Global)
export declare global {
  interface Window {
    getVersion: () => any;
    ethereum;
    web3;
    getFordBudget: () => any;
    getSelectedAddress: () => any;
    checkNetwork: () => any;
    checkPermissionToAccessAccounts: () => any;
  }
}
