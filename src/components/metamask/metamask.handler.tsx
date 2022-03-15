import { Metamask } from 'src/pages/user/user.dto';
import { Wildapter, MetamaskAdapterEnums } from './adaptor';
import { set_connected_status, set_extension_status, set_user_metamask_data } from 'src/store/reducers/MetamaskReducer';
import { store } from 'src/store/store';

class MetamaskHandler {
  instance!: MetamaskHandler;
  constructor() {
    console.log('MetamaskHandler Registered');
    if (this.instance instanceof MetamaskHandler) {
      console.log('MetamaskHandler instanceof MetamaskHandler');
      return this.instance;
    }
    this.instance = this;
  }

  public checkExtension() {
    const status = Wildapter.checkMetamask();
    this.setExtension(status);
    if (!status) {
      this.setConnected(false);
    }
    return status;
  }

  public async checkConnection() {
    const status = await Wildapter.checkConnection();
    this.setConnected(status);
    if (!status) {
      console.log('Metamask not connected');
      this.setUserMetamaskData(null);
    }

    return status;
  }

  public async getUserInfo(): Promise<Metamask | null> {
    const fodrBalance = await Wildapter.getFordBudget();
    const warcBalance = await Wildapter.getWarcBudget();
    const walletAddress = await Wildapter.getSelectedAddress();
    const status = fodrBalance && warcBalance && walletAddress ? { fodrBalance, warcBalance, walletAddress } : null;
    return status;
  }

  public async init(): Promise<boolean> {
    const isExtension = this.checkExtension();
    if (isExtension) {
      const isConnected = await this.checkConnection();
      if (isConnected) {
        this.setUserMetamaskData(await this.getUserInfo());
        return true; // if metamask is connected
      }
    }
    return false; // if metamask is not connected or not found in browser or extension

    // const state = {
    //   extension: Wildapter.checkMetamask(),
    //   connected: await Wildapter.checkConnection(),
    //   data: await this.getUserInfo(),
    // };
    // return state;
  }

  public setConnected(status: boolean) {
    store.dispatch(set_connected_status(status));
  }

  public setExtension(status: boolean) {
    store.dispatch(set_extension_status(status));
  }

  public setUserMetamaskData(data: Metamask | null) {
    store.dispatch(set_user_metamask_data(data));
  }

  public registerEvents() {
    setTimeout(() => {
      Wildapter.on(MetamaskAdapterEnums.FOUND_METAMASK, () => {
        console.log('Metamask found');
        this.setExtension(true);
      });

      Wildapter.on(MetamaskAdapterEnums.CONNECTED, async (connection: { chainId: string }) => {
        this.setConnected(connection.chainId === process.env.REACT_APP_CHAIN_ID);
        this.setUserMetamaskData(await this.getUserInfo());
      });

      Wildapter.on(MetamaskAdapterEnums.CHAIN_CHANGED, async (chainId: string) => {
        const status = chainId === process.env.REACT_APP_CHAIN_ID;
        this.setConnected(status);
        this.setUserMetamaskData(await this.getUserInfo());
      });

      Wildapter.on(MetamaskAdapterEnums.ACCOUNTS_CHANGED, async (account: string) => {
        this.setUserMetamaskData(await this.getUserInfo());
        console.log(account);
      });

      Wildapter.on(MetamaskAdapterEnums.DISCONNECTED, (error) => {
        console.log(MetamaskAdapterEnums.DISCONNECTED + ' event triggered. Error: ', error);
      });
    }, 0);
  }
}

const mh = new MetamaskHandler();

export { mh as MetamaskHandler };
