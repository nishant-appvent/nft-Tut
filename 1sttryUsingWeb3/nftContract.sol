// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract nftContract is Ownable, ERC1155 {
    // Base URI
    string private baseURI;
    string public name;

    constructor()
        ERC1155(
            'ipfs://QmWQud9NzmDM7YHrZ8XET1u8cjz5gtzUX9CPhGnYM5wFSs/{id}.json'
        )
    {
        name='Appvent Bulk Deploy Collection';
    }
    
    function setURI(string memory _newuri) public onlyOwner {
        _setURI(_newuri);
    }

    function mintBatch(uint256[] memory ids, uint256[] memory amounts)
        public
        onlyOwner
    {
        _mintBatch(0x487104772569AaD8d2443E39ED09Dd5235505Cf8, ids, amounts, '');
    }
}
