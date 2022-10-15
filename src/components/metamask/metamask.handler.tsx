import { MetaMaskAdapterEnums, Wildapter } from './adaptor';
import {
  set_metamask_network_status,
  set_metamask_extension_status,
  set_metamask_permission_status,
  set_metamask_fodr_balance,
  set_metamask_warc_balance,
  set_metamask_wallet_address,
  set_metamask_status,
} from 'src/store/reducers/MetamaskReducer';
import { store } from 'src/store/store';
import { api } from 'src/components/axios/axios.component';
import { set_user_login } from 'src/store/reducers/RangerReducer';
import { fodrCurrency, warcCurrency } from 'src/utils/currency';

class MetaMaskHandler {
  static instance: MetaMaskHandler;
  constructor() {
    if (MetaMaskHandler.instance instanceof MetaMaskHandler) {
      return MetaMaskHandler.instance;
    }
    // TODO: window.ethereum.enable();
    this.registerEvents();
    MetaMaskHandler.instance = this;
  }

  public checkExtension() {
    const status = Wildapter.checkMetaMask();
    this.setMetaMaskExtension(status);
    if (!status) {
      this.setMetaMaskNetwork(false);
      this.setMetaMaskPermission(false);
      this.checkBalance();
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
      const account = await Wildapter.provider.request({ method: 'eth_accounts' });
      status = account.length > 0;
      this.setMetaMaskWalletAddress(status ? account[0] : null);
    } catch (error) {
      this.setMetaMaskWalletAddress(null);
      status = false;
    }
    this.setMetaMaskPermission(status);
    return status;
  }

  public async checkBalance(): Promise<void> {
    const fodr = await Wildapter.getFordBudget();
    const warc = await Wildapter.getWarcBudget();
    this.setMetaMaskFodrBalance(fodrCurrency(typeof fodr === 'string' ? fodr : '0'));
    this.setMetaMaskWarcBalance(warcCurrency(typeof warc === 'string' ? warc : '0'));
  }

  public async init(): Promise<boolean> {
    let status = false;
    const extension = await this.checkExtension();
    if (extension) {
      const permission = await this.checkPermission();
      const network = await this.checkNetwork();
      const task = [extension, network, permission];
      status = task.filter((item) => item === false).length <= 0;
      this.checkBalance();
    }
    if (status) {
      try {
        const { metamask } = store.getState();
        const response = await api.post('/user/login', { data: { username: 'wildalo', email: 'gamer@wildalo.com', address: metamask.walletAddress } });
        store.dispatch(set_user_login(response.data.data));
        if (!response.data.data) {
          console.log('TODO: user not logged in');
        }
      } catch (error) {
        console.log('TODO: user not found error: ', error);
        store.dispatch(set_user_login(false));
      }
    }
    store.dispatch(set_metamask_status(status));
    return status;
  }

  reset() {
    // store.dispatch(set_metamask_extension_status(false));
    // store.dispatch(set_metamask_network_status(false));
    store.dispatch(set_metamask_permission_status(false));
    store.dispatch(set_metamask_fodr_balance(0));
    store.dispatch(set_metamask_warc_balance(0));
    store.dispatch(set_metamask_wallet_address(null));
    store.dispatch(set_metamask_status(false));
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
    accounts;
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

  public setMetaMaskFodrBalance(data: number) {
    store.dispatch(set_metamask_fodr_balance(data));
  }

  public setMetaMaskWarcBalance(data: number) {
    store.dispatch(set_metamask_warc_balance(data));
  }

  public setMetaMaskWalletAddress(data: string | null) {
    store.dispatch(set_metamask_wallet_address(data));
  }

  public reload() {
    window.location.reload();
  }

  public registerEvents() {
    Wildapter.on(MetaMaskAdapterEnums.FOUND_METAMASK, () => {
      // this.setExtension(true);
      // console.log('event: FOUND_METAMASK');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.UNLOCKED_ACCOUNT, () => {
      // this.setExtension(true);
      // console.log('event: UNLOCKED_ACCOUNT');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.NOT_FOUND_METAMASK, () => {
      // this.setExtension(true);
      // console.log('event: NOT_FOUND_METAMASK');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.ENABLED_PERMISSION_TO_ACCESS_ACCOUNTS, () => {
      // this.setExtension(true);
      // console.log('event: ENABLED_PERMISSION_TO_ACCESS_ACCOUNTS');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.HAS_NOT_PERMISSION_TO_ACCESS_ACCOUNTS, () => {
      // this.setExtension(true);
      // console.log('event: HAS_NOT_PERMISSION_TO_ACCESS_ACCOUNTS');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.WRONG_NETWORK, () => {
      // this.setExtension(true);
      // console.log('event: WRONG_NETWORK');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.ACCOUNTS_CHANGED, () => {
      // this.setExtension(true);
      // console.log('event: ACCOUNTS_CHANGED');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.CHAIN_CHANGED, () => {
      // this.setExtension(true);
      // console.log('event: CHAIN_CHANGED');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.CONNECTED, () => {
      // this.setExtension(true);
      // console.log('event: CONNECTED');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.DISCONNECTED, () => {
      // this.setExtension(true);
      // console.log('event: DISCONNECTED');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.ALREADY_METHOD_TRIGGERED, () => {
      // this.setExtension(true);
      // console.log('event: ALREADY_METHOD_TRIGGERED');
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.METHOD_CANCELLED, () => {
      // this.setExtension(true);
      // console.log('event: METHOD_CANCELLED');
      // this.init();
    });

    /** dddd */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Wildapter.on(MetaMaskAdapterEnums.CONNECTED, async (_connection) => {
      // this.setNetwork(connection.chainId === process.env.REACT_APP_TARGET_CHAIN_ID);
      // this.setUserMetaMaskData(await this.getUserInfo());
      // console.log('event: CONNECTED: ', _connection);
      // this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.CHAIN_CHANGED, async (_chainId) => {
      // this.setNetwork(chainId === process.env.REACT_APP_TARGET_CHAIN_ID);
      // this.setUserMetaMaskData(await this.getUserInfo());
      console.log('event: CHAIN_CHANGED: ', _chainId);
      this.init();
    });

    Wildapter.on(MetaMaskAdapterEnums.ACCOUNTS_CHANGED, async (_account: string[]) => {
      // this.setUserMetaMaskData(await this.getUserInfo());
      console.log('event: ACCOUNTS_CHANGED ', _account);
      this.reload();
    });

    Wildapter.on(MetaMaskAdapterEnums.DISCONNECTED, (_error) => {
      console.log('event: DISCONNECTED ', JSON.stringify(_error));
    });

    const handler = (error: any) => console.log('tribe gel:', error);
    Wildapter.on('message', handler);
  }
}

export { MetaMaskHandler };
window.wildapter = Wildapter;
