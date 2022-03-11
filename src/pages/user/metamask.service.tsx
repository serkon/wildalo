/*
  const getMetamaskInformation = async () => {
  const provider = await new web3.providers.HttpProvider('http://localhost:8545');
  const web3Instance = new web3(provider);
  const accounts = await web3Instance.eth.getAccounts();
  const balance = await web3Instance.eth.getBalance(accounts[0]);
  const networkId = await web3Instance.eth.net.getId();
  const networkData = await web3Instance.eth.net.getNetworkType();
  const isConnected = await web3Instance.eth.net.isListening();
  const coinbase = await web3Instance.eth.getCoinbase();
  const blockNumber = await web3Instance.eth.getBlockNumber();
  const block = await web3Instance.eth.getBlock(blockNumber);
  const gasPrice = await web3Instance.eth.getGasPrice();
  const gasLimit = await web3Instance.eth.getBlock('latest').gasLimit;
  const balanceInWei = await web3Instance.eth.getBalance(coinbase);
  const balanceInEther = await web3Instance.utils.fromWei(balanceInWei, 'ether');
  const balanceInEtherString = await web3Instance.utils.fromWei(balanceInWei, 'ether');

  return {
    accounts,
    balance,
    networkId,
    networkData,
    isConnected,
    coinbase,
    blockNumber,
    block,
    gasPrice,
    gasLimit,
    balanceInWei,
    balanceInEther,
    balanceInEtherString,
  };
};
const provider = await new web3.providers.HttpProvider('http://localhost:8545');
const web3Instance = new web3(provider);
 */

import { Metamask } from './user.dto';

export const ethereum = async (): Promise<boolean> => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    console.log(accounts);

    return true;
  }

  return false;
};

export default class MetamaskAdapter {
  public static async isExtentionEnable() {
    return await window.checkMetamask();
  }

  public static async isConnected() {
    return await window.checkConnection();
  }

  public static async checkConnection() {
    return window.checkConnection();
  }

  public static async getFordBudget() {
    return await window.getFordBudget();
  }

  public static async getWarcBudget() {
    return await window.getWarcBudget();
  }

  public static async getWalletAddress() {
    return await window.getSelectedAddress();
  }

  public async info(): Promise<Metamask> {
    const fodrBalance = await MetamaskAdapter.getFordBudget();
    const warcBalance = await MetamaskAdapter.getWarcBudget();
    const walletAddress = await MetamaskAdapter.getWalletAddress();

    return { fodrBalance, warcBalance, walletAddress };
  }
}
