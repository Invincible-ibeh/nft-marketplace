const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { create, getNFTs, buyNFT } = require('./nftContract');
const mongoose = require('mongoose');
const cluster = require('express-cluster');



// Parse incoming request bodies
app.use(bodyParser.json());

app.use(passport.initialize());

// Replace this with your own function to fetch a user from your database
async function getUserById(userId) {
  // Implement your logic to fetch user from database
}

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key',  // make sure this key is safe and secure
    },
    async (payload, done) => {
      const user = await getUserById(payload.userId);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }
  )
);


// Add your middleware and routes here

cluster(function(worker) {
  app.listen(port, () => {
    console.log(`Worker ${worker.id} listening on port ${port}`);
  });
}, { count: 4 }); // Number of worker processes

cluster.run();


// Create a new NFT
app.post('/nfts', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
app.get('/nfts', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const nfts = await getNFTs();
    res.json(nfts);
  } catch (error) {
    console.error('An error occurred while fetching NFTs:', error);
    res.status(500).json({ error: 'Failed to fetch NFTs.' });
  }
});

// Buy an NFT
app.post('/nfts/:id/buy', passport.authenticate('jwt', { session: false }), async (req, res) => {
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



// Connect to MongoDB
mongoose.connect('mongodb://localhost/nft-marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Example usage: Creating a new user
const user = new User({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
});

user.save();


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

