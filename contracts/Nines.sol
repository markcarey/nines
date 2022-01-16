// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { NineToken } from './NineToken.sol';

contract Nines is AccessControlEnumerable, IERC1155Receiver {
    using SafeMath for uint256;

    // owners[chainId][contract][tokenId] = ownerAddress
    mapping (uint256 => mapping (address => mapping (uint256 => address))) private _owners;

    bytes32 public constant MANAGER = keccak256("MANAGER_ROLE");
    bytes32 public constant REGISTRAR = keccak256("REGISTRAR_ROLE");

    NineToken public nineToken;
    uint256 public lastId;

    struct NFT {
        uint256 chainId;
        address contractAddress;
        uint256 tokenId;
    }

    struct Nine {
        string name;
        uint256 tokenId;
    }
    mapping (bytes32 => Nine) _nines;
    mapping (bytes32 => NFT[]) _ninths;
    bytes32[] public ninesIds;

    enum ProposalType { Mint, Challenge, Respond, Evict }

    struct Proposal {
        bytes32 id;
        ProposalType kind;
        bytes32 nineId;
        bytes32 opponent;
        uint256 votesFor;
        uint256 votesAgainst;
    }

    event NineCreated(
        bytes32 id,
        string name
    );

    event NinthJoined(
        bytes32 nineId,
        uint256 chainId,
        address contractAddress,
        uint256 tokenId
    );

    event NinthEvicted(
        bytes32 nineId,
        uint256 chainId,
        address contractAddress,
        uint256 tokenId
    );

    event NineFull(
        bytes32 id,
        string name
    );

    event NineMinted(
        bytes32 id,
        string name,
        uint256 tokenId
    );

    constructor() {
        nineToken = new NineToken();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MANAGER, msg.sender);
        _setupRole(REGISTRAR, msg.sender);
    }

    function register(uint256 chainId, address contractAddress, uint256 tokenId, address holder) public onlyRole(REGISTRAR) {
        if ( _owners[chainId][contractAddress][tokenId] != address(0) ) {
            // this nft alrewady registered
            if ( _owners[chainId][contractAddress][tokenId] != holder ) {
                // new holder for this NFT
                // TODO: return stake (if any) to holder
            } else {
                // same nft, same holder: no-op
                return;
            }
        }
        _owners[chainId][contractAddress][tokenId] = holder;
    }

    function registeredOwnerOf(uint256 chainId, address contractAddress, uint256 tokenId) public view returns(address) {
        return _owners[chainId][contractAddress][tokenId];
    }

    function _isOwner(uint256 chainId, address contractAddress, uint256 tokenId) internal view returns(bool) {
        return _owners[chainId][contractAddress][tokenId] == msg.sender;
    } 

    function create(uint256 chainId, address contractAddress, uint256 tokenId, string calldata name) public {
        require(_owners[chainId][contractAddress][tokenId] == msg.sender, "!reg owner");
        bytes32 id = keccak256(abi.encode(name));
        require(bytes(_nines[id].name).length == 0, "!name taken");
        _nines[id] = Nine(name, 0);
        NFT[] storage members = _ninths[id];
        members.push( NFT(chainId, contractAddress, tokenId) );
        ninesIds.push(id);
        emit NineCreated(id, name);
    }

    function _isNotInNine(uint256 chainId, address contractAddress, uint256 tokenId, bytes32 nineId) internal view returns(bool) {
        bool isNot = true;
        for (uint256 i = 0; i < _ninths[nineId].length; i++) {
            if ( 
                ( _ninths[nineId][i].chainId == chainId ) &&
                ( _ninths[nineId][i].contractAddress == contractAddress ) &&
                ( _ninths[nineId][i].tokenId == tokenId )
            ) {
                isNot = false;
            }
        }
        return isNot;
    }

    function join(uint256 chainId, address contractAddress, uint256 tokenId, bytes32 nineId) public {
        require(_owners[chainId][contractAddress][tokenId] == msg.sender, "!reg owner");
        require(bytes(_nines[nineId].name).length != 0, "!not found");
        require(_ninths[nineId].length < 9, "!full");
        require(_isNotInNine(chainId, contractAddress, tokenId, nineId), "!in nine");
        NFT[] storage members = _ninths[nineId];
        members.push( NFT(chainId, contractAddress, tokenId) );
        emit NinthJoined(nineId, chainId, contractAddress, tokenId);

        if (_ninths[nineId].length == 9) {
            emit NineFull(nineId, _nines[nineId].name);

            // move next part to a proposal if there is time
            lastId++;
            nineToken.mint(address(this), lastId, 9, "");
            _nines[nineId].tokenId = lastId;
            emit NineMinted(nineId, _nines[nineId].name, lastId);
            for (uint256 i = 0; i < _ninths[nineId].length; i++) {
                address to = this.registeredOwnerOf(_ninths[nineId][i].chainId, _ninths[nineId][i].contractAddress, _ninths[nineId][i].tokenId);
                nineToken.safeTransferFrom(address(this), to, _nines[nineId].tokenId, 1, "");
            }
            // move above part to a proposal if there is time
        }
    }

    function getNinesIds() external view returns(bytes32[] memory) {
        return ninesIds;
    }
    function getNine(bytes32 id) external view returns(Nine memory) {
        return _nines[id];
    }
    function getNinths(bytes32 id) external view returns(NFT[] memory) {
        NFT[] storage members = _ninths[id];
        return members;
    }

    function mint() public {
        
    }

    function invite() public {
        
    }

    function challenge() public {
        
    }

    function respond() public {
        
    }

    function decline() public {
        
    }

    function evict() public {
        
    }

    function vote() public {
        
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external pure override returns (bytes4) {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external pure override returns (bytes4) {
        return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
    }
}


