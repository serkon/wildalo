import { Wildapter, MetamaskContractAdaptor } from './index';

Wildapter.checkConnection();
MetamaskContractAdaptor.on('connected', () => {
  console.log('connected');
});
