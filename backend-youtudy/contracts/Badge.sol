// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24;

import "./ERC721/ERC721.sol";
import "./ERC721/ERC721Enumerable.sol";

contract Badge is ERC721, ERC721Enumerable {
  
  event BadgeCreated (uint256 indexed tokenId, string name, uint256 timestamp);

  mapping (uint256 => BadgeData) private _badgeList;

  struct BadgeData {
    uint256 tokenId;                       // Unique token id  
    address[] ownerHistory;                // History of all previous owners
    string name;                           // The name of badge
    uint256 timestamp;                     // Created time  
  }

  function createBadge (string name) public {
    uint256 tokenId = totalSupply() + 1;

    _mint(msg.sender, tokenId);

    address[] memory ownerHistory;

    BadgeData memory newBadgeData = BadgeData({
        tokenId : tokenId, 
        ownerHistory : ownerHistory,
        name : name,
        timestamp : now
    });

    _badgeList[tokenId] = newBadgeData;
    _badgeList[tokenId].ownerHistory.push(msg.sender);

    emit BadgeCreated(tokenId, name, now);
  }

  function transferOwnership(uint256 tokenId, address to) public returns(uint, address, address, address) {
        safeTransferFrom(msg.sender, to, tokenId);
        uint ownerHistoryLength = _badgeList[tokenId].ownerHistory.length;
        return (
            _badgeList[tokenId].tokenId, 
            //original owner
            _badgeList[tokenId].ownerHistory[0],
            //previous owner, length cannot be less than 2
            _badgeList[tokenId].ownerHistory[ownerHistoryLength-2],
            //current owner
            _badgeList[tokenId].ownerHistory[ownerHistoryLength-1]);
    }

  function transferFrom(address from, address to, uint256 tokenId) public {
      super.transferFrom(from, to, tokenId);
      _badgeList[tokenId].ownerHistory.push(to);
  }

  function getTotalBadgeCount () public view returns (uint) {
    return totalSupply();
  }

  function getBadge (uint tokenId) public view 
    returns(uint256, address[], string, uint256) {
      require(_badgeList[tokenId].tokenId != 0, "Badge does not exist");
      return (
        _badgeList[tokenId].tokenId,
        _badgeList[tokenId].ownerHistory,
        _badgeList[tokenId].name,
        _badgeList[tokenId].timestamp);
  }

}