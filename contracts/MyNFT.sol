// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


/**

@title MyNFT

@dev A smart contract for creating and managing non-fungible tokens (NFTs) based on the ERC721 standard. It allows token minting, transferring, and burning.

@author Amity808 on github

@notice This contract is provided as-is without any warranties or guarantees.

@dev This contract inherits from the ERC721, ERC721Enumerable, ERC721URIStorage, and Ownable contracts from the OpenZeppelin library.

@dev The contract uses the Counters library for managing the token ID counter.
*/

contract  MyNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    /**
    @dev Contract constructor. Initializes the ERC721 contract with the name "MyNFT" and the symbol "MNFT".
    */
    constructor() ERC721("MyNFT", "MNFT") {}

    /**
    @struct add struct of listed completed certificate
    */
    struct MintedCompletedCertificate {
        address owner;
        string serialNumber;
        string uri;
    }

    /**
    @dev mapping address of completed certificates
    */

    mapping (uint256 => MintedCompletedCertificate) mintedCertificate;

      // modifier to check if the address id the owner of the certificate
    modifier isCertificateOwner(uint256 tokenId, address certificateOwner){
        require(certificateOwner == ownerOf(tokenId), "You are not the owner");
        _;
    
    /**
    @dev Emitted when a new token is minted.
    @param to The address that received the token.
    @param tokenId The ID of the minted token.
    @param uri The URI associated with the minted token.
    */
    event TokenMinted(address indexed to, uint256 tokenId, string uri);

    /**
    @dev Emitted before a token transfer occurs.
    @param from The address transferring the token.
    @param to The address receiving the token.
    @param tokenId The ID of the transferred token.
    @param batchSize The size of the token transfer batch.
    */
    event BeforeTokenTransfer(address indexed from, address indexed to, uint256 tokenId, uint256 batchSize);
    
    /**
    @dev Emitted when a token is burned.
    @param tokenId The ID of the burned token.
    */
    event TokenBurned(uint256 tokenId);


    /**
    @dev Safely mints a new token and assigns it to the specified address.
    @param to The address that will receive the minted token.
    @param uri The URI associated with the minted token.
    @notice Only the contract owner can call this function.
    @dev Emits a TokenMinted event upon successful minting.
    @dev Requires a non-zero recipient address.
    */
    function safeMint(address to, string memory uri) public onlyOwner {
        require(to != address(0), "Invalid recipient address");
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit TokenMinted(to, tokenId, uri);
    }

    function listCompletedCertificate(uint256 tokenId, string memory _serialNumber) public { 
        string memory _uri = tokenURI(tokenId);
        mintedCertificate[tokenId] = MintedCompletedCertificate(msg.sender, _serialNumber, _uri);
    }

    /**
    @dev Hook function that is called before a token transfer occurs.
    @param from The address transferring the token.
    @param to The address receiving the token.
    @param tokenId The ID of the transferred token.
    @param batchSize The size of the token transfer batch.
    @dev Emits a BeforeTokenTransfer event upon token transfer.
    */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        emit BeforeTokenTransfer(from, to, tokenId, batchSize);
    }


    /**
    @dev Burns the specified token.
    @param tokenId The ID of the token to be burned.
    @notice Only the owner of the token can call this function.
    @dev Emits a TokenBurned event upon successful token burn.
    */

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        emit TokenBurned(tokenId);
    }


    /**
    @dev Returns the URI associated with a given token.
    @param tokenId The ID of the token.
    @return The URI associated with the token.
    */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
    @dev Checks if a given interface is supported by the contract.
    @param interfaceId The interface identifier.
    @return true if the interface is supported, false otherwise.
    */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns(bool) {
        return super.supportsInterface(interfaceId);
    }
}
