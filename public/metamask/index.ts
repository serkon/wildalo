import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { EventEmitter } from 'eventemitter3';

interface MetamaskContractAdaptorInterface {
  on: (event: string, listener: (...args: any[]) => void) => void;
}

export class MetamaskContractAdaptor extends EventEmitter implements MetamaskContractAdaptorInterface {
  static FOUND_METAMASK = 'foundMetamask';
  static UNLOCKED_ACCOUNT = 'unlockedAccount';
  static NOT_FOUND_METAMASK = 'notFoundMetamask';
  static NOT_UNLOCKED_ACCOUNT = 'notUnlockedAccount';
  static ENABLED_PERMISSION_TO_ACCESS_ACCOUNTS = 'enabledPermissionToAccessAccounts';
  static HAS_NOT_PERMISSION_TO_ACCESS_ACCOUNTS = 'hasNotPermissionToAccessAccounts';
  static WRONG_NETWORK = 'wrongNetwork';
  static ACCOUNTS_CHANGED = 'accountsChanged';
  static CHAIN_CHANGED = 'chainChanged';
  static CONNECTED = 'connected';
  static DISCONNECTED = 'disconnected';
  static ALREADY_METHOD_TRIGGERED = 'alreadyMethodTriggered';
  static METHOD_CANCELLED = 'methodCancelled';
  static ERROR_CODES = {
    ALREADY_METHOD_TRIGGERED: '-32002',
    METHOD_CANCELLED: '4001',
  };

  private provider: any;
  private web3: Web3;
  private wildaloContract: Contract;
  private isFoundMetamask = false;
  static on: any;
  // private warcContract: Contract;
  // private fodrContract: Contract;

  // constructor other parameters: WarcContractAddress: string, WarcContractJson : any, FodrContractAddress: string, FodrContractJson : any,
  constructor(private targetChainId: string, wildaloContractAddress: string, wildaloContractJson: any) {
    super();
    if (!window) {
      throw Error('Window required.');
    }
    this.provider = (window as any).ethereum;
    this.web3 = new Web3(this.provider);
    this.wildaloContract = new this.web3.eth.Contract(wildaloContractJson, wildaloContractAddress);
    // this.warcContract = new this.web3.eth.Contract(WarcContractJson, WarcContractAddress);
    // this.fodrContract = new this.web3.eth.Contract(FodrContractJson, FodrContractAddress);
    if (this.provider) {
      this.provider.on('accountsChanged', (accounts: any) => {
        this.emit(MetamaskContractAdaptor.ACCOUNTS_CHANGED, accounts);
      });
      this.provider.on('chainChanged', (chainId: any) => {
        this.emit(MetamaskContractAdaptor.CHAIN_CHANGED, chainId);
      });
      this.provider.on('connect', (cnnectInfo: any) => {
        this.emit(MetamaskContractAdaptor.CONNECTED, cnnectInfo);
      });
      this.provider.on('disconnected', (error: any) => {
        this.emit(MetamaskContractAdaptor.DISCONNECTED, error);
      });
    }
  }

  public checkMetamask(): boolean {
    const self = this as MetamaskContractAdaptor;

    if ('undefined' === typeof self.provider) {
      self.emit(MetamaskContractAdaptor.NOT_FOUND_METAMASK);

      return false;
    }

    if (self.provider.isConnected == false || self.provider.isMetaMask == false) {
      self.emit(MetamaskContractAdaptor.NOT_FOUND_METAMASK);

      return false;
    }

    if (self.isFoundMetamask == false) {
      self.isFoundMetamask = true;
      self.emit(MetamaskContractAdaptor.FOUND_METAMASK);
    }

    return true;
  }

  public checkNetwork(): boolean {
    const self = this as MetamaskContractAdaptor;

    if (self.provider.chainId != self.targetChainId) {
      self.emit(MetamaskContractAdaptor.WRONG_NETWORK);

      return false;
    }

    return true;
  }

  public async checkPermissionToAccessAccounts(): Promise<boolean> {
    const self = this as MetamaskContractAdaptor;

    return new Promise((resolve, _reject) => {
      self.provider
        .request({ method: 'eth_requestAccounts' })
        .then(resolve(true))
        .catch((error: { code: string }) => {
          if (error.code == MetamaskContractAdaptor.ERROR_CODES.METHOD_CANCELLED) {
            self.emit(MetamaskContractAdaptor.METHOD_CANCELLED, 'checkPermissionToAccessAccounts');
          }

          if (error.code == MetamaskContractAdaptor.ERROR_CODES.ALREADY_METHOD_TRIGGERED) {
            self.emit(MetamaskContractAdaptor.ALREADY_METHOD_TRIGGERED, 'checkPermissionToAccessAccounts');
          }
          self.emit(MetamaskContractAdaptor.HAS_NOT_PERMISSION_TO_ACCESS_ACCOUNTS);
          resolve(false);
        });
    });
  }

  // ##################################################################################
  //  ALL CHECK
  // ##################################################################################

  public async checkConnection(): Promise<boolean> {
    if (!(await this.checkMetamask())) {
      return false;
    }

    if (!(await this.checkNetwork())) {
      return false;
    }

    if (!(await this.checkPermissionToAccessAccounts())) {
      return false;
    }

    return true;
  }

  public async enablePermissionToAccessAccounts() {
    const self = this as MetamaskContractAdaptor;

    return new Promise((resolve, _reject) => {
      self.provider
        .request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        })
        .then((permissions: any[]) => {
          const accountsPermission = permissions.find((permission: { parentCapability: string }) => permission.parentCapability === 'eth_accounts');

          if (accountsPermission) {
            self.emit(MetamaskContractAdaptor.ENABLED_PERMISSION_TO_ACCESS_ACCOUNTS);
            resolve(true);
          }
        })
        .catch((error: { code: string }) => {
          if (error.code == MetamaskContractAdaptor.ERROR_CODES.METHOD_CANCELLED) {
            self.emit(MetamaskContractAdaptor.METHOD_CANCELLED, 'enablePermissionToAccessAccounts');
          }

          if (error.code == MetamaskContractAdaptor.ERROR_CODES.ALREADY_METHOD_TRIGGERED) {
            self.emit(MetamaskContractAdaptor.ALREADY_METHOD_TRIGGERED, 'enablePermissionToAccessAccounts');
          }

          self.emit(MetamaskContractAdaptor.HAS_NOT_PERMISSION_TO_ACCESS_ACCOUNTS);
          resolve(false);
        });
    });
  }

  public async sign(message: string, password: string): Promise<string | null> {
    const checkResult = await this.checkConnection();
    const getSelectedAddress = await this.getSelectedAddress();

    if (checkResult) {
      return new Promise((resolve, reject) => {
        this.web3.eth.personal.sign(message, getSelectedAddress as string, password, (error: Error, signature: string): void => {
          if (error) {
            reject(error);
          }
          resolve(signature);
        });
      });
    }

    return null;
  }

  public async getSelectedAddress(): Promise<string | null> {
    const accounts = await this.provider.request({ method: 'eth_requestAccounts' });

    if (accounts && accounts.length) {
      return accounts[0];
    }

    return null;
  }

  public getSelectedChainId(): string {
    return this.provider.chainId;
  }

  public async getFordBudget(): Promise<string | null> {
    const checkResult = await this.checkConnection();

    if (!checkResult) {
      return null;
    }

    return '250000000000000';
  }

  public async getWarcBudget(): Promise<string | null> {
    const checkResult = await this.checkConnection();

    if (!checkResult) {
      return null;
    }

    return '120000000000000';
  }

  private async sendContractMethod(contract: Contract, method: string, ...args: any[]): Promise<string | boolean> {
    const checkResult = await this.checkConnection();

    if (checkResult) {
      const from = await this.getSelectedAddress();

      return new Promise((resolve, reject) => {
        contract.methods[method](...args).send(
          {
            from,
          },
          (error: Error, transactionHash: string) => {
            if (error) {
              reject(error);
            }
            resolve(transactionHash);
          },
        );
      });
    }

    return checkResult;
  }

  private async callContractMethod(contract: Contract, method: string, ...args: any[]): Promise<string | boolean> {
    const checkResult = await this.checkConnection();

    if (checkResult) {
      return new Promise((resolve, reject) => {
        contract.methods[method](...args).call((error: Error, result: any) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        });
      });
    }

    return checkResult;
  }

  // ##################################################################################
  //  CONTRACT METHODS
  // ##################################################################################

  public async upgradeCard(cardId: string, burnedCardId: string): Promise<any> {
    return this.sendContractMethod(this.wildaloContract, 'upgradeCard', cardId, burnedCardId);
  }

  public async createAuction(currency: string, cardId: string, startPrice: string, endPrice: string, duration: string): Promise<any> {
    return this.sendContractMethod(this.wildaloContract, 'createAuction', currency, cardId, startPrice, endPrice, duration);
  }

  public async cancelAuction(cardId: string): Promise<any> {
    return this.sendContractMethod(this.wildaloContract, 'cancelAuction', cardId);
  }

  public async bid(cardId: string): Promise<any> {
    return this.sendContractMethod(this.wildaloContract, 'bid', cardId);
  }

  // TEST
  public async store(number: number): Promise<any> {
    return this.sendContractMethod(this.wildaloContract, 'store', number);
  }

  public async retrieve(): Promise<any> {
    return this.callContractMethod(this.wildaloContract, 'retrieve');
  }
}

export const Wildapter: MetamaskContractAdaptor = new MetamaskContractAdaptor('0xa869', '0x4860F3f0217D738A3cfF28C5E6e10C977ca8e35d', [
  {
    constant: false,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setAuctionContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'isLinked',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'retrieve',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setCardBaseContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'isSharedWith',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setRepositoryContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'exists',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'tokenByIndex',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
      {
        name: '_isShared',
        type: 'bool',
      },
      {
        name: '_linked',
        type: 'bool',
      },
    ],
    name: 'setSharingWith',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setCardPackageContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'num',
        type: 'uint256',
      },
    ],
    name: 'store',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setSettingsContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
      {
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setCardContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'newOwner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        name: '_to',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: '_cardId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: '_burnedCardId',
        type: 'uint256',
      },
    ],
    name: 'UpgradeCard',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: '_packageType',
        type: 'uint256',
      },
      {
        indexed: false,
        name: '_currency',
        type: 'uint256',
      },
    ],
    name: 'BuyPackage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: '_currency',
        type: 'uint256',
      },
      {
        indexed: false,
        name: '_cardId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: '_startPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        name: '_endPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        name: '_duration',
        type: 'uint256',
      },
    ],
    name: 'CreatAuction',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: '_cardId',
        type: 'uint256',
      },
    ],
    name: 'CancelAuction',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_owner',
        type: 'address',
      },
      {
        indexed: true,
        name: '_approved',
        type: 'address',
      },
      {
        indexed: false,
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_owner',
        type: 'address',
      },
      {
        indexed: true,
        name: '_operator',
        type: 'address',
      },
      {
        indexed: false,
        name: '_approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'mintFodr',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_metedata',
        type: 'uint256',
      },
    ],
    name: 'createCardBase',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_baseId',
        type: 'uint256',
      },
    ],
    name: 'mintCardWithBaseId',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_cardId',
        type: 'uint256',
      },
      {
        name: '_burnedCardId',
        type: 'uint256',
      },
    ],
    name: 'upgradeCard',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_packageType',
        type: 'uint256',
      },
      {
        name: '_currency',
        type: 'uint256',
      },
    ],
    name: 'buyPackage',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_currency',
        type: 'uint256',
      },
      {
        name: '_cardId',
        type: 'uint256',
      },
      {
        name: '_startPrice',
        type: 'uint256',
      },
      {
        name: '_endPrice',
        type: 'uint256',
      },
      {
        name: '_duration',
        type: 'uint256',
      },
    ],
    name: 'createAuction',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_cardId',
        type: 'uint256',
      },
    ],
    name: 'cancelAuction',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_cardId',
        type: 'uint256',
      },
    ],
    name: 'bid',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
]);
