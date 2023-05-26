// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract MyNFT is ERC721, Ownable {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIds;

//     mapping(uint => uint) public tokenPrice;

//     constructor() ERC721("MyNFT", "MNFT") {}

//     function mint(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
//         _tokenIds.increment();

//         uint256 newItemId = _tokenIds.current();
//         _mint(recipient, newItemId);
//         _setTokenURI(newItemId, tokenURI);

//         return newItemId;
//     }

//     function setPrice(uint _tokenId, uint _price) public {
//         require(_isApprovedOrOwner(_msgSender(), _tokenId), "ERC721: caller is not owner nor approved");
//         tokenPrice[_tokenId] = _price;
//     }

//     function buyToken(uint _tokenId) public payable {
//         require(msg.value >= tokenPrice[_tokenId], "Not enough Ether to purchase the token.");
//         require(ownerOf(_tokenId) != msg.sender, "You are the owner of this token.");

//         address tokenOwner = ownerOf(_tokenId);
//         payable(tokenOwner).transfer(msg.value);
//         _transfer(tokenOwner, msg.sender, _tokenId);
//     }
// }
