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

export const ethereum = async (): Promise<boolean> => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // window.web3 = new Web3(window.ethereum);

    return true;
  }

  return false;
};
