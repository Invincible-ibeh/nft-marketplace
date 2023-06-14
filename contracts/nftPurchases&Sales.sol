// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) public tokenPrice;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    

    function getNFTs() public view returns (uint256[] memory) {
    uint256 totalSupply = _tokenIds.current();
    uint256[] memory nftIds = new uint256[](totalSupply);

    for (uint256 i = 0; i < totalSupply; i++) {
        nftIds[i] = tokenByIndex(i);
    }

    return nftIds;
}


    function setPrice(uint256 tokenId, uint256 price) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not owner nor approved");
        tokenPrice[tokenId] = price;
    }
 
    function buyToken(uint256 tokenId) public payable {
        require(msg.value >= tokenPrice[tokenId], "Not enough Ether to purchase the token.");
        require(ownerOf(tokenId) != msg.sender, "You are the owner of this token.");

        address tokenOwner = ownerOf(tokenId);
        payable(tokenOwner).transfer(msg.value);
        _transfer(tokenOwner, msg.sender, tokenId);
    }
}