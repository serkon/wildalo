declare module 'react-router-dom';

// In typings.d.ts(is Global)
export declare global {
  interface Window {
    getVersion: () => any;
    setMaintenance: () => void;
    ethereum;
    web3;
    wildapter: MetamaskContractAdaptor;
  }

  interface SVGSVGElement {
    xmlns?: string;
    xmlnsXlink?: string;
  }
}

declare module 'd3';
