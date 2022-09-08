import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { EventEmitter } from 'eventemitter3';

import { default as FODRJSON } from './build/Fodr.json';
import { default as WARCJSON } from './build/Warc.json';
import { default as WILDALOJSON } from './build/Wildalo.json';

export interface MetaMaskContractAdaptorInterface {
  on: (event: string, listener: (...args: any[]) => void) => void;
  off: (event: string, listener: (...args: any[]) => void) => void;
  emit: (event: string, ...args: any[]) => boolean;
  checkMetaMask: () => boolean;
  checkNetwork: () => boolean;
  checkPermissionToAccessAccounts: () => Promise<boolean>;
  checkConnection: () => Promise<boolean>;
  enablePermissionToAccessAccounts: () => Promise<boolean>;
  sign: (message: string, password: string) => Promise<string | null>;
  getSelectedChainId: () => string;
  getSelectedAddress: () => Promise<string | null>;
}

export class MetaMaskAdapterEnums {
  static FOUND_METAMASK = 'foundMetaMask';
  static UNLOCKED_ACCOUNT = 'unlockedAccount';
  static NOT_FOUND_METAMASK = 'notFoundMetaMask';
  static NOT_UNLOCKED_ACCOUNT = 'notUnlockedAccount';
  static ENABLED_PERMISSION_TO_ACCESS_ACCOUNTS = 'enabledPermissionToAccessAccounts';
  static HAS_NOT_PERMISSION_TO_ACCESS_ACCOUNTS = 'hasNotPermissionToAccessAccounts';
  static WRONG_NETWORK = 'wrongNetwork';
  static ACCOUNTS_CHANGED = 'accountsChanged';
  static CHAIN_CHANGED = 'chainChanged';
  static CONNECTED = 'connected';
  static DISCONNECTED = 'disconnect';
  static ALREADY_METHOD_TRIGGERED = 'alreadyMethodTriggered';
  static METHOD_CANCELLED = 'methodCancelled';
  static ERROR_CODES = {
    ALREADY_METHOD_TRIGGERED: '-32002',
    METHOD_CANCELLED: '4001',
  };
}

export class MetaMaskContractAdaptor extends EventEmitter implements MetaMaskContractAdaptorInterface {
  public provider: any;
  private web3!: Web3;
  private wildaloContract!: Contract;
  private warcContract!: Contract;
  private fodrContract!: Contract;
  private isFoundMetaMask = false;
  static on: any;
  // private warcContract: Contract;
  // private fodrContract: Contract;

  constructor(
    private targetChainId: string,
    public wildaloContractAddress: string,
    public wildaloContractJson: any,
    public warcContractAddress: string,
    public warcContractJson: any,
    public fodrContractAddress: string,
    public fodrContractJson: any,
    private repositoryContractAddress: string,
  ) {
    super();
    if (!window) {
      throw Error('Window required.');
    }
    this.initialize(wildaloContractAddress, warcContractAddress, fodrContractAddress);
  }

  public async initialize(wildaloContractAddress: string, warcContractAddress: string, fodrContractAddress: string) {
    this.provider = window.ethereum;
    this.web3 = await new Web3(this.provider);
    this.wildaloContract = new this.web3.eth.Contract(WILDALOJSON.abi as any[], wildaloContractAddress);
    this.warcContract = new this.web3.eth.Contract(WARCJSON.abi as any[], warcContractAddress);
    this.fodrContract = new this.web3.eth.Contract(FODRJSON.abi as any[], fodrContractAddress);

    this.registerEvents();
    // this.warcContract = new this.web3.eth.Contract(WarcContractJson, WarcContractAddress);
    // this.fodrContract = new this.web3.eth.Contract(FodrContractJson, FodrContractAddress);
  }

  public registerEvents() {
    if (this.provider) {
      this.provider.on('accountsChanged', (accounts: any) => {
        this.emit(MetaMaskAdapterEnums.ACCOUNTS_CHANGED, accounts);
      });
      this.provider.on('chainChanged', (chainId: any) => {
        this.emit(MetaMaskAdapterEnums.CHAIN_CHANGED, chainId);
      });
      this.provider.on('connect', (cnnectInfo: any) => {
        this.emit(MetaMaskAdapterEnums.CONNECTED, cnnectInfo);
      });
      this.provider.on('disconnected', (error: any) => {
        this.emit(MetaMaskAdapterEnums.DISCONNECTED, error);
      });
      this.provider.on('disconnect', (error: any) => {
        this.emit(MetaMaskAdapterEnums.DISCONNECTED, error);
      });
    }
  }

  public checkMetaMask(): boolean {
    const self = this as MetaMaskContractAdaptor;
    if ('undefined' === typeof self.provider) {
      self.emit(MetaMaskAdapterEnums.NOT_FOUND_METAMASK);
      return false;
    }
    if (self.provider.isConnected == false || self.provider.isMetaMask == false) {
      self.emit(MetaMaskAdapterEnums.NOT_FOUND_METAMASK);
      return false;
    }
    if (self.isFoundMetaMask == false) {
      self.isFoundMetaMask = true;
      self.emit(MetaMaskAdapterEnums.FOUND_METAMASK);
    }
    return true;
  }

  public checkNetwork(): boolean {
    const self = this as MetaMaskContractAdaptor;
    if (self.provider.chainId != self.targetChainId) {
      self.emit(MetaMaskAdapterEnums.WRONG_NETWORK);
      return false;
    }
    return true;
  }

  public async checkPermissionToAccessAccounts(): Promise<boolean> {
    const self = this as MetaMaskContractAdaptor;
    return new Promise((resolve) => {
      self.provider
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          resolve(true);
        })
        .catch((error: { code: string }) => {
          if (error.code == MetaMaskAdapterEnums.ERROR_CODES.METHOD_CANCELLED) {
            self.emit(MetaMaskAdapterEnums.METHOD_CANCELLED, 'checkPermissionToAccessAccounts');
          }
          if (error.code == MetaMaskAdapterEnums.ERROR_CODES.ALREADY_METHOD_TRIGGERED) {
            self.emit(MetaMaskAdapterEnums.ALREADY_METHOD_TRIGGERED, 'checkPermissionToAccessAccounts');
          }
          self.emit(MetaMaskAdapterEnums.HAS_NOT_PERMISSION_TO_ACCESS_ACCOUNTS);
          resolve(false);
        });
    });
  }

  // ##################################################################################
  //  ALL CHECK
  // ##################################################################################

  public async checkConnection(): Promise<boolean> {
    return (await this.checkMetaMask()) && (await this.checkNetwork()) && (await this.checkPermissionToAccessAccounts());
  }

  public async enablePermissionToAccessAccounts(): Promise<boolean> {
    // const self = this as MetaMaskContractAdaptor;
    return new Promise(
      ((resolve: (value: boolean | PromiseLike<boolean>) => void) => {
        this.provider
          .request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          })
          .then((permissions: any[]) => {
            const accountsPermission = permissions.find((permission: { parentCapability: string }) => permission.parentCapability === 'eth_accounts');
            if (accountsPermission) {
              this.emit(MetaMaskAdapterEnums.ENABLED_PERMISSION_TO_ACCESS_ACCOUNTS);
              resolve(true);
            }
          })
          .catch((error: { code: string }) => {
            if (error.code == MetaMaskAdapterEnums.ERROR_CODES.METHOD_CANCELLED) {
              this.emit(MetaMaskAdapterEnums.METHOD_CANCELLED, 'enablePermissionToAccessAccounts');
            }
            if (error.code == MetaMaskAdapterEnums.ERROR_CODES.ALREADY_METHOD_TRIGGERED) {
              this.emit(MetaMaskAdapterEnums.ALREADY_METHOD_TRIGGERED, 'enablePermissionToAccessAccounts');
            }
            this.emit(MetaMaskAdapterEnums.HAS_NOT_PERMISSION_TO_ACCESS_ACCOUNTS);
            resolve(false);
          });
      }).bind(this),
    );
  }

  public async sign(message: string): Promise<string | null> {
    const checkResult = await this.checkConnection();
    if (!checkResult) {
      return null;
    }
    return new Promise((resolve, reject) => {
      const init = async () => {
        const getAddress = await this.getSelectedAddress();
        if (getAddress) {
          this.web3.eth.personal.sign(message, getAddress, 'wildalo', (error: Error, signature: string): void => {
            if (error) {
              reject(error);
            }
            resolve(signature);
          });
        } else {
          resolve(null);
        }
      };
      init();
    });
  }

  public async getSelectedAddress(): Promise<string | null> {
    const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    if (accounts && accounts.length) {
      return accounts[0];
    }
    return null;
  }

  public getSelectedChainId(): string {
    return this.provider.chainId;
  }

  private async sendContractMethod(contract: Contract, method: string, ...args: any[]): Promise<string | boolean> {
    const checkResult = await this.checkConnection();
    if (checkResult) {
      const from = await this.getSelectedAddress();
      return new Promise((resolve, reject) => {
        contract.methods[method](...args).send({ from }, (error: Error, transactionHash: string) => {
          error && reject(error);
          resolve(transactionHash);
        });
      });
    }

    return checkResult;
  }

  private async sendByValueContractMethod(contract: Contract, method: string, value: string, ...args: any[]): Promise<string | boolean> {
    const checkResult = await this.checkConnection();
    if (checkResult) {
      const from = await this.getSelectedAddress();
      return new Promise((resolve, reject) => {
        contract.methods[method](...args).send({ from, value }, (error: Error, transactionHash: string) => {
          error && reject(error);
          resolve(transactionHash);
        });
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
  // CONTRACT METHODS
  // ##################################################################################

  // ##################################################################################
  // wildaloContract
  // ##################################################################################
  public async upgradeCard(cardId: string, burnedCardId: string): Promise<any> {
    return this.sendContractMethod(this.wildaloContract, 'upgradeCard', cardId, burnedCardId);
  }

  public async getPackagePrice(packageType: string, currency: string): Promise<string | boolean> {
    return this.callContractMethod(this.wildaloContract, packageType, currency);
  }

  public async buyPackage(packageType: string, currency: string, value: string): Promise<any> {
    return this.sendByValueContractMethod(this.wildaloContract, 'buyPackage', value, packageType, currency);
  }

  public async createAuction(currency: string, cardId: string, startPrice: string, endPrice: string, duration: string): Promise<any> {
    return this.sendContractMethod(this.wildaloContract, 'createAuction', currency, cardId, startPrice, endPrice, duration);
  }

  public async cancelAuction(cardId: string): Promise<any> {
    return this.sendContractMethod(this.wildaloContract, 'cancelAuction', cardId);
  }

  public async bid(cardId: string, value: string): Promise<any> {
    return this.sendByValueContractMethod(this.wildaloContract, 'bid', value, cardId);
  }

  // ##################################################################################
  // fodrContract
  // ##################################################################################

  public async getFordBudget(): Promise<string | boolean> {
    const from = await this.getSelectedAddress();
    return this.callContractMethod(this.fodrContract, 'balanceOf', from);
  }

  public async approveFodr(value: string): Promise<any> {
    return this.sendContractMethod(this.fodrContract, 'approve', this.repositoryContractAddress, value);
  }

  public async allowanceFodr(): Promise<any> {
    const from = await this.getSelectedAddress();
    return this.callContractMethod(this.fodrContract, 'allowance', from, this.repositoryContractAddress);
  }

  // ##################################################################################
  // warcContract
  // ##################################################################################

  public async getWarcBudget(): Promise<string | boolean> {
    const from = await this.getSelectedAddress();
    return this.callContractMethod(this.warcContract, 'balanceOf', from);
  }
}

export const Wildapter: MetaMaskContractAdaptor = new MetaMaskContractAdaptor(
//  process.env.REACT_APP_TARGET_CHAIN_ID as string,
//  process.env.REACT_APP_WILDALO_CONTRACT_ADDRESS as string,
//  process.env.REACT_APP_WARC_CONTRACT_ADDRESS as string,
//  process.env.REACT_APP_FODR_CONTRACT_ADDRESS as string,
//  process.env.REACT_APP_REPOSITORY_CONTRACT_ADDRESS as string,
  "0x7e4",
  "0x3Be6b045a51b6110136b97568ca45cdDA0a2099b", 
  [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setAuctionContract",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isLinked",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setCardBaseContract",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "isSharedWith",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setRepositoryContract",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "exists",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_isShared",
          "type": "bool"
        },
        {
          "name": "_linked",
          "type": "bool"
        }
      ],
      "name": "setSharingWith",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setCardPackageContract",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setSettingsContract",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "setCardContract",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "newOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "MintFodr",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "requestId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "currency",
          "type": "uint256"
        }
      ],
      "name": "TransferFunds",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "metedata",
          "type": "uint256"
        }
      ],
      "name": "CreateCardBase",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "cardId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "metadata",
          "type": "uint256"
        }
      ],
      "name": "MintCardWithBaseId",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "cardId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "burnedCardId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "metadata",
          "type": "uint256"
        }
      ],
      "name": "UpgradeCard",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "packageId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "packageType",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "currency",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "BuyPackage",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "currency",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "cardId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "startPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "endPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "duration",
          "type": "uint256"
        }
      ],
      "name": "CreatAuction",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "cardId",
          "type": "uint256"
        }
      ],
      "name": "CancelAuction",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "cardId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "biddedAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "currency",
          "type": "uint256"
        }
      ],
      "name": "Bid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mintFodr",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_requestId",
          "type": "uint256"
        },
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_currency",
          "type": "uint256"
        }
      ],
      "name": "transferFunds",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_metedata",
          "type": "uint256"
        }
      ],
      "name": "createCardBase",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_baseId",
          "type": "uint256"
        }
      ],
      "name": "mintCardWithBaseId",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_cardId",
          "type": "uint256"
        },
        {
          "name": "_burnedCardId",
          "type": "uint256"
        }
      ],
      "name": "upgradeCard",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_packageType",
          "type": "uint256"
        },
        {
          "name": "_currencyType",
          "type": "uint256"
        }
      ],
      "name": "getPackagePrice",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_packageType",
          "type": "uint256"
        },
        {
          "name": "_currency",
          "type": "uint256"
        }
      ],
      "name": "buyPackage",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_currency",
          "type": "uint256"
        },
        {
          "name": "_cardId",
          "type": "uint256"
        },
        {
          "name": "_startPrice",
          "type": "uint256"
        },
        {
          "name": "_endPrice",
          "type": "uint256"
        },
        {
          "name": "_duration",
          "type": "uint256"
        }
      ],
      "name": "createAuction",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_cardId",
          "type": "uint256"
        }
      ],
      "name": "cancelAuction",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_cardId",
          "type": "uint256"
        }
      ],
      "name": "bid",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_currency",
          "type": "uint256"
        }
      ],
      "name": "getTokenAllowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_cardId",
          "type": "uint256"
        }
      ],
      "name": "getCardInfo",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "0x9e8a0ffa91eF9109911F79b5a895A26F43D0e5FA",
  [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isLinked",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "isSharedWith",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "_totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_isShared",
          "type": "bool"
        },
        {
          "name": "_linked",
          "type": "bool"
        }
      ],
      "name": "setSharingWith",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowed",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "newOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "MAX_UINT",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenURI",
          "type": "string"
        }
      ],
      "name": "setTokenURI",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "tokenURI",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "0xCf498Ab6B09F13A479B16fe0445da76e8BF77879",
  [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isLinked",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "isSharedWith",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "tokenURI",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "_totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_isShared",
          "type": "bool"
        },
        {
          "name": "_linked",
          "type": "bool"
        }
      ],
      "name": "setSharingWith",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowed",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "newOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "MAX_UINT",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenURI",
          "type": "string"
        }
      ],
      "name": "setTokenURI",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "0x5Ea9e30f061Ba27911F6d21d084a16B22F036C9F"
);