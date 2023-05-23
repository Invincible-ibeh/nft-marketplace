// app.js

import React, { useState } from 'react';
import './App.css';
import web3 from './web3';
import nftContract from './nftContract';

function App() {
  const [account, setAccount] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tokenURI, setTokenURI] = useState('');

  const connectWallet = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const mintNFT = async () => {
    const result = await nftContract.methods.mint(recipient, tokenURI).send({ from: account });
    setTokenId(result.events.Transfer.returnValues[2]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Celo NFT Marketplace</h1>
        {account ? (
          <>
            <p>Connected account: {account}</p>
            <div>
              <label>Recipient Address:</label>
              <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            </div>
            <div>
              <label>Token URI:</label>
              <input type="text" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} />
            </div>
            <button onClick={mintNFT}>Mint NFT</button>
            {tokenId && <p>NFT minted with Token ID: {tokenId}</p>}
          </>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </header>
    </div>
  );
}

export default App;// app.js

import React, { useState } from 'react';
import './App.css';
import web3 from './web3';
import nftContract from './nftContract';

function App() {
  const [account, setAccount] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tokenURI, setTokenURI] = useState('');

  const connectWallet = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const mintNFT = async () => {
    const result = await nftContract.methods.mint(recipient, tokenURI).send({ from: account });
    setTokenId(result.events.Transfer.returnValues[2]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Celo NFT Marketplace</h1>
        {account ? (
          <>
            <p>Connected account: {account}</p>
            <div>
              <label>Recipient Address:</label>
              <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            </div>
            <div>
              <label>Token URI:</label>
              <input type="text" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} />
            </div>
            <button onClick={mintNFT}>Mint NFT</button>
            {tokenId && <p>NFT minted with Token ID: {tokenId}</p>}
          </>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </header>
    </div>
  );
}

export default App;