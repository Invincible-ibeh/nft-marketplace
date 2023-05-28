//javascript

const contractAddress = '0x123456...'; // Address of the deployed NFT contract

app.post('/nfts/buy', async (req, res) => {
  const { tokenId, price } = req.body;
  const account = req.user.account; // Assuming user authentication is implemented

  // Approve the contract to spend user's cUSD
  const cUSDContract = new web3.eth.Contract(cUSDContractABI, cUSDContractAddress);
  await cUSDContract.methods.approve(contractAddress, price).send({ from: account });

  // Call the buy function on the NFT contract
  const nftContract = new web3.eth.Contract(nftContractABI, contractAddress);
  await nftContract.methods.buy(tokenId).send({ from: account, value: price });

  res.sendStatus(200);
});