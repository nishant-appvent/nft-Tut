// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract ERC1155withMint is Ownable, ERC1155 {

    string public name;

    constructor(string memory _name) ERC1155("")
    {
        name = _name;
    }

    function mintBatch(string memory _newuri,uint256[] memory ids, uint256[] memory amounts)
        public
        onlyOwner
    {   
        _setURI(_newuri);
        _mintBatch(msg.sender, ids, amounts, '');
    }

}
