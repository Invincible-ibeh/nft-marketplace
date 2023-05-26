const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { create, getNFTs, buyNFT } = require('./nftContract');

// Parse incoming request bodies
app.use(bodyParser.json());

// Create a new NFT
app.post('/nfts', async (req, res) => {
  const { name, description, image, price } = req.body;
  try {
    const nftId = await create(name, description, image, price);
    res.json({ success: true, nftId });
  } catch (error) {
    console.error('An error occurred while creating NFT:', error);
    res.status(500).json({ success: false, error: 'Failed to create NFT.' });
  }
});

// Get the list of NFTs
app.get('/nfts', async (req, res) => {
  try {
    const nfts = await getNFTs();
    res.json(nfts);
  } catch (error) {
    console.error('An error occurred while fetching NFTs:', error);
    res.status(500).json({ error: 'Failed to fetch NFTs.' });
  }
});

// Buy an NFT
app.post('/nfts/:id/buy', async (req, res) => {
  const { id } = req.params;
  try {
    const success = await buyNFT(id);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, error: 'Failed to buy NFT.' });
    }
  } catch (error) {
    console.error('An error occurred while buying NFT:', error);
    res.status(500).json({ success: false, error: 'Failed to buy NFT.' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});