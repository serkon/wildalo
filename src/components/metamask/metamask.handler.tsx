import { MetaMaskAdapterEnums, Wildapter } from './adaptor';
import {
  set_metamask_network_status,
  set_metamask_extension_status,
  set_metamask_permission_status,
  set_metamask_fodr_balance,
  set_metamask_warc_balance,
  set_metamask_wallet_address,
} from 'src/store/reducers/MetamaskReducer';
import { store } from 'src/store/store';

class MetaMaskHandler {
  instance!: MetaMaskHandler;
  constructor() {
    console.log('MetaMaskHandler Registered');
    if (this.instance instanceof MetaMaskHandler) {
      console.log('MetaMaskHandler instanceof MetaMaskHandler');
      return this.instance;
    }
    // TODO: window.ethereum.enable();
    this.registerEvents();
    this.instance = this;
  }

  public checkExtension() {
    const status = Wildapter.checkMetaMask();
    this.setMetaMaskExtension(status);
    if (!status) {
      this.setMetaMaskNetwork(false);
    }
    return status;
  }

  public checkNetwork() {
    const status = Wildapter.checkNetwork();
    this.setMetaMaskNetwork(status);
    return status;
  }

  public async checkPermission() {
    let status = false;
    try {
      const account = await window.ethereum.request({ method: 'eth_accounts' });
      status = account.length > 0;
      this.setMetaMaskWalletAddress(status ? account[0] : null);
    } catch (error) {
      console.error('check permission error: ', error);
      this.setMetaMaskWalletAddress(null);
      debugger;
      status = false;
    }
    this.setMetaMaskPermission(status);
    return status;
  }

  public async checkBalance(): Promise<void> {
    this.setMetaMaskFodrBalance(await Wildapter.getFordBudget());
    this.setMetaMaskWarcBalance(await Wildapter.getWarcBudget());
  }

  public async init(): Promise<boolean> {
    const permission = await this.checkPermission();
    const extension = await this.checkExtension();
    const network = await this.checkNetwork();
    const task = [extension, network, permission];
    const status = task.filter((item) => item === false).length <= 0;
    this.checkBalance();
    return status;
  }

  reset() {
    store.dispatch(set_metamask_extension_status(false));
    store.dispatch(set_metamask_network_status(false));
    store.dispatch(set_metamask_permission_status(false));
    store.dispatch(set_metamask_fodr_balance(null));
    store.dispatch(set_metamask_warc_balance(null));
    store.dispatch(set_metamask_wallet_address(null));
  }

  async disconnect() {
    const accounts = await Wildapter.provider
      .request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then(() =>
        Wildapter.provider.request({
          method: 'eth_requestAccounts',
        }),
      )
      .catch((e: any) => console.log('disconnect error: ', e));
    console.log('accounts: ', accounts);
  }

  public setMetaMaskExtension(status: boolean) {
    store.dispatch(set_metamask_extension_status(status));
  }

  public setMetaMaskNetwork(status: boolean) {
    store.dispatch(set_metamask_network_status(status));
  }

  public setMetaMaskPermission(status: boolean) {
    store.dispatch(set_metamask_permission_status(status));
  }

  public setMetaMaskFodrBalance(data: string | null) {
    store.dispatch(set_metamask_fodr_balance(data));
  }

  public setMetaMaskWarcBalance(data: string | null) {
    store.dispatch(set_metamask_warc_balance(data));
  }

  public setMetaMaskWalletAddress(data: string | null) {
    store.dispatch(set_metamask_wallet_address(data));
  }

  public registerEvents() {
    Wildapter.on(MetaMaskAdapterEnums.FOUND_METAMASK, () => {
      // this.setExtension(true);
      console.log('event: FOUND_METAMASK');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.CONNECTED, async (connection: { chainId: string }) => {
      // this.setNetwork(connection.chainId === process.env.REACT_APP_CHAIN_ID);
      // this.setUserMetaMaskData(await this.getUserInfo());
      console.log('event: CONNECTED: ', connection);
      this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.CHAIN_CHANGED, async (chainId: string) => {
      // this.setNetwork(chainId === process.env.REACT_APP_CHAIN_ID);
      // this.setUserMetaMaskData(await this.getUserInfo());
      console.log('event: CHAIN_CHANGED: ', chainId);
      this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.ACCOUNTS_CHANGED, async (account: string[]) => {
      // this.setUserMetaMaskData(await this.getUserInfo());
      console.log('event: ACCOUNTS_CHANGED ', account);
      this.init();
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.DISCONNECTED, (error) => {
      console.log('event: DISCONNECTED ', JSON.stringify(error));
    });

    const handler = (error: any) => console.log('tribe gel:', error);
    window.ethereum.on('message', handler);
  }
}

const mh = new MetaMaskHandler();

export { mh as MetaMaskHandler };
window.wildapter = Wildapter;
