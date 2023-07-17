MyNFT
This contract is provided as-is without any warranties or guarantees.

_A smart contract for creating and managing non-fungible tokens (NFTs) based on the ERC721 standard. It allows token minting, transferring, and burning.

This contract inherits from the ERC721, ERC721Enumerable, ERC721URIStorage, and Ownable contracts from the OpenZeppelin library.

The contract uses the Counters library for managing the token ID counter._

Contract
MyNFT : contracts/dacade.sol

A smart contract for creating and managing non-fungible tokens (NFTs) based on the ERC721 standard. It allows token minting, transferring, and burning.

This contract inherits from the ERC721, ERC721Enumerable, ERC721URIStorage, and Ownable contracts from the OpenZeppelin library.

The contract uses the Counters library for managing the token ID counter.

Functions:
constructor
constructor() public
Contract constructor. Initializes the ERC721 contract with the name "MyNFT" and the symbol "MNFT".

safeMint
function safeMint(address to, string uri) public
Safely mints a new token and assigns it to the specified address. @param to The address that will receive the minted token. @param uri The URI associated with the minted token. @notice Only the contract owner can call this function. @dev Emits a TokenMinted event upon successful minting. @dev Requires a non-zero recipient address.

_beforeTokenTransfer
function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal
Hook function that is called before a token transfer occurs. @param from The address transferring the token. @param to The address receiving the token. @param tokenId The ID of the transferred token. @param batchSize The size of the token transfer batch. @dev Emits a BeforeTokenTransfer event upon token transfer.

_burn
function _burn(uint256 tokenId) internal
Burns the specified token. @param tokenId The ID of the token to be burned. @notice Only the owner of the token can call this function. @dev Emits a TokenBurned event upon successful token burn.

tokenURI
function tokenURI(uint256 tokenId) public view returns (string)
Returns the URI associated with a given token. @param tokenId The ID of the token. @return The URI associated with the token.

supportsInterface
function supportsInterface(bytes4 interfaceId) public view returns (bool)
Checks if a given interface is supported by the contract. @param interfaceId The interface identifier. @return true if the interface is supported, false otherwise.

inherits Ownable:

owner
function owner() public view virtual returns (address)
Returns the address of the current owner.

_checkOwner
function _checkOwner() internal view virtual
Throws if the sender is not the owner.

renounceOwnership
function renounceOwnership() public virtual
_Leaves the contract without owner. It will not be possible to call onlyOwner functions. Can only be called by the current owner.

NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner._

transferOwnership
function transferOwnership(address newOwner) public virtual
Transfers ownership of the contract to a new account (newOwner). Can only be called by the current owner.

_transferOwnership
function _transferOwnership(address newOwner) internal virtual
Transfers ownership of the contract to a new account (newOwner). Internal function without access restriction.

inherits ERC721URIStorage:

_setTokenURI
function _setTokenURI(uint256 tokenId, string _tokenURI) internal virtual
_Sets _tokenURI as the tokenURI of tokenId.

Emits {MetadataUpdate}.

Requirements:

tokenId must exist._
inherits ERC721Enumerable:

tokenOfOwnerByIndex
function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual returns (uint256)
See {IERC721Enumerable-tokenOfOwnerByIndex}.

totalSupply
function totalSupply() public view virtual returns (uint256)
See {IERC721Enumerable-totalSupply}.

tokenByIndex
function tokenByIndex(uint256 index) public view virtual returns (uint256)
See {IERC721Enumerable-tokenByIndex}.

inherits IERC721Enumerable: inherits ERC721:

balanceOf
function balanceOf(address owner) public view virtual returns (uint256)
See {IERC721-balanceOf}.

ownerOf
function ownerOf(uint256 tokenId) public view virtual returns (address)
See {IERC721-ownerOf}.

name
function name() public view virtual returns (string)
See {IERC721Metadata-name}.

symbol
function symbol() public view virtual returns (string)
See {IERC721Metadata-symbol}.

_baseURI
function _baseURI() internal view virtual returns (string)
Base URI for computing {tokenURI}. If set, the resulting URI for each token will be the concatenation of the baseURI and the tokenId. Empty by default, can be overridden in child contracts.

approve
function approve(address to, uint256 tokenId) public virtual
See {IERC721-approve}.

getApproved
function getApproved(uint256 tokenId) public view virtual returns (address)
See {IERC721-getApproved}.

setApprovalForAll
function setApprovalForAll(address operator, bool approved) public virtual
See {IERC721-setApprovalForAll}.

isApprovedForAll
function isApprovedForAll(address owner, address operator) public view virtual returns (bool)
See {IERC721-isApprovedForAll}.

transferFrom
function transferFrom(address from, address to, uint256 tokenId) public virtual
See {IERC721-transferFrom}.

safeTransferFrom
function safeTransferFrom(address from, address to, uint256 tokenId) public virtual
See {IERC721-safeTransferFrom}.

safeTransferFrom
function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) public virtual
See {IERC721-safeTransferFrom}.

_safeTransfer
function _safeTransfer(address from, address to, uint256 tokenId, bytes data) internal virtual
_Safely transfers tokenId token from from to to, checking first that contract recipients are aware of the ERC721 protocol to prevent tokens from being forever locked.

data is additional data, it has no specified format and it is sent in call to to.

This internal function is equivalent to {safeTransferFrom}, and can be used to e.g. implement alternative mechanisms to perform token transfer, such as signature-based.

Requirements:

from cannot be the zero address.
to cannot be the zero address.
tokenId token must exist and be owned by from.
If to refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
Emits a {Transfer} event._

_ownerOf
function _ownerOf(uint256 tokenId) internal view virtual returns (address)
Returns the owner of the tokenId. Does NOT revert if token doesn't exist

_exists
function _exists(uint256 tokenId) internal view virtual returns (bool)
_Returns whether tokenId exists.

Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.

Tokens start existing when they are minted (_mint), and stop existing when they are burned (_burn)._

_isApprovedOrOwner
function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool)
_Returns whether spender is allowed to manage tokenId.

Requirements:

tokenId must exist._
_safeMint
function _safeMint(address to, uint256 tokenId) internal virtual
_Safely mints tokenId and transfers it to to.

Requirements:

tokenId must not exist.
If to refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
Emits a {Transfer} event._

_safeMint
function _safeMint(address to, uint256 tokenId, bytes data) internal virtual
_Same as {xref-ERC721-safeMint-address-uint256-}[_safeMint], with an additional data parameter which is forwarded in {IERC721Receiver-onERC721Received} to contract recipients.

_mint
function _mint(address to, uint256 tokenId) internal virtual
_Mints tokenId and transfers it to to.

WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible

Requirements:

tokenId must not exist.
to cannot be the zero address.
Emits a {Transfer} event._

_transfer
function _transfer(address from, address to, uint256 tokenId) internal virtual
_Transfers tokenId from from to to. As opposed to {transferFrom}, this imposes no restrictions on msg.sender.

Requirements:

to cannot be the zero address.
tokenId token must be owned by from.
Emits a {Transfer} event._

_approve
function _approve(address to, uint256 tokenId) internal virtual
_Approve to to operate on tokenId

Emits an {Approval} event._

_setApprovalForAll
function _setApprovalForAll(address owner, address operator, bool approved) internal virtual
_Approve operator to operate on all of owner tokens

Emits an {ApprovalForAll} event._

_requireMinted
function _requireMinted(uint256 tokenId) internal view virtual
Reverts if the tokenId has not been minted yet.

_afterTokenTransfer
function _afterTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal virtual
_Hook that is called after any token transfer. This includes minting and burning. If {ERC721Consecutive} is used, the hook may be called as part of a consecutive (batch) mint, as indicated by batchSize greater than 1.

Calling conditions:

When from and to are both non-zero, from's tokens were transferred to to.
When from is zero, the tokens were minted for to.
When to is zero, from's tokens were burned.
from and to are never both zero.
batchSize is non-zero.
To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]._

__unsafe_increaseBalance
function __unsafe_increaseBalance(address account, uint256 amount) internal
_Unsafe write access to the balances, used by extensions that "mint" tokens using an {ownerOf} override.

WARNING: Anyone calling this MUST ensure that the balances remain consistent with the ownership. The invariant being that for any address a the value returned by balanceOf(a) must be equal to the number of tokens such that ownerOf(tokenId) is a._

inherits IERC721Metadata: inherits IERC4906: inherits IERC721: inherits ERC165: inherits IERC165:

Events:
TokenMinted
event TokenMinted(address to, uint256 tokenId, string uri)
Emitted when a new token is minted. @param to The address that received the token. @param tokenId The ID of the minted token. @param uri The URI associated with the minted token.

BeforeTokenTransfer
event BeforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
Emitted before a token transfer occurs. @param from The address transferring the token. @param to The address receiving the token. @param tokenId The ID of the transferred token. @param batchSize The size of the token transfer batch.

TokenBurned
event TokenBurned(uint256 tokenId)
Emitted when a token is burned. @param tokenId The ID of the burned token.

inherits Ownable:

OwnershipTransferred
event OwnershipTransferred(address previousOwner, address newOwner)
inherits ERC721URIStorage: inherits ERC721Enumerable: inherits IERC721Enumerable: inherits ERC721: inherits IERC721Metadata: inherits IERC4906:

MetadataUpdate
event MetadataUpdate(uint256 _tokenId)
This event emits when the metadata of a token is changed. So that the third-party platforms such as NFT market could timely update the images and related attributes of the NFT.

BatchMetadataUpdate
event BatchMetadataUpdate(uint256 _fromTokenId, uint256 _toTokenId)
This event emits when the metadata of a range of tokens is changed. So that the third-party platforms such as NFT market could timely update the images and related attributes of the NFTs.

inherits IERC721:

Transfer
event Transfer(address from, address to, uint256 tokenId)
Emitted when tokenId token is transferred from from to to.

Approval
event Approval(address owner, address approved, uint256 tokenId)
Emitted when owner enables approved to manage the tokenId token.

ApprovalForAll
event ApprovalForAll(address owner, address operator, bool approved)
Emitted when owner enables or disables (approved) operator to manage all of its assets.

inherits ERC165: inherits IERC165:
