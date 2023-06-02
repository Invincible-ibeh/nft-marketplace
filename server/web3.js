//javascript

const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const web3 = new Web3(new Web3.providers.HttpProvider('https://celo.infura.io/v3/YOUR_PROJECT_ID'));

// Connect to smart contract
const contractAddress = '0x123456...';
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}];
const contractInstance = new Contract(contractABI, contractAddress);

// Connect to Celo wallet
const cUSDContractAddress = '0x765DE816845861e75A25fCA122bb6898B8B1282a';
const cUSDContractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}
],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const cUSDContractInstance = new Contract(cUSDContractABI, cUSDContractAddress);

async function connectWallet() {
const accounts = await web3.eth.getAccounts();
const account = accounts[0];
console.log('Connected account:', account);
}

async function mintNFT() {
const tokenURI = 'https://example.com/nft-metadata';
const result = await contractInstance.methods.mint(web3.eth.defaultAccount, tokenURI).send({ from: web3.eth.defaultAccount });
console.log('NFT minted:', result);
}

connectWallet();
mintNFT();