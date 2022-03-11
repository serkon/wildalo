declare module 'react-router-dom';

// In typings.d.ts(is Global)
export declare global {
  interface Window {
    getVersion: () => any;
    ethereum;
    web3;
    wildalo: any;
    checkMetamask: () => any;
    checkConnection: () => any;
    getFordBudget: () => any;
    getWarcBudget: () => any;
    getSelectedAddress: () => any;
    checkNetwork: () => any;
    checkPermissionToAccessAccounts: () => any;
    sign: () => any;
    getSelectedChainId: () => any;
    getSelectedAddress: () => any;
    upgradeCard: () => any;
    createAuction: () => any;
  }
}
