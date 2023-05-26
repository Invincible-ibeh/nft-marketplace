document.addEventListener("DOMContentLoaded", async () => {
    const nftsContainer = document.getElementById("nfts-container");
  
    // Fetch the list of NFTs
    const response = await fetch("/nfts");
    const nfts = await response.json();
  
    // Display the NFTs
    nfts.forEach(nft => {
      const card = createNFTCard(nft);
      nftsContainer.appendChild(card);
    });
  });
  
  function createNFTCard(nft) {
    const card = document.createElement("div");
    card.classList.add("nft-card");
  
    const image = document.createElement("img");
    image.src = nft.image;
    card.appendChild(image);
  
    const content = document.createElement("div");
    content.classList.add("nft-card-content");
  
    const title = document.createElement("h2");
    title.textContent = nft.name;
    content.appendChild(title);
  
    const description = document.createElement("p");
    description.textContent = nft.description;
    content.appendChild(description);
  
    const price = document.createElement("p");
    price.textContent = "Price: " + nft.price + " ETH";
    content.appendChild(price);
  
    const buyButton = document.createElement("button");
    buyButton.textContent = "Buy";
    buyButton.addEventListener("click", () => buyNFT(nft.id));
    content.appendChild(buyButton);
  
    card.appendChild(content);
  
    return card;
  }
  
  async function buyNFT(nftId) {
    try {
      const response = await fetch(`/nfts/${nftId}/buy`, { method: "POST" });
      if (response.ok) {
        alert("NFT purchased successfully!");
      } else {
        alert("Failed to purchase NFT.");
      }
    } catch (error) {
      console.error("An error occurred while purchasing NFT:", error);
      alert("An error occurred while purchasing NFT.");
    }
  }