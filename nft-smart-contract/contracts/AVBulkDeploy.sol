    // SPDX-License-Identifier: MIT
    pragma solidity >=0.4.22 <0.9.0;

    import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
    import '@openzeppelin/contracts/access/Ownable.sol';

    contract AVBulkDeploy is Ownable, ERC1155 {
        // Base URI
        string private baseURI;
        string public name;

        constructor()
            ERC1155(
                'ipfs://QmWQud9NzmDM7YHrZ8XET1u8cjz5gtzUX9CPhGnYM5wFSs/{id}.json'
            )
        {
            setName('Appvent Bulk Deploy Collection');
        }

        function setURI(string memory _newuri) public onlyOwner {
            _setURI(_newuri);
        }

        function setName(string memory _name) public onlyOwner {
            name = _name;
        }

        function mintBatch(uint256[] memory ids, uint256[] memory amounts)
            public
            onlyOwner
        {
            _mintBatch(msg.sender, ids, amounts, '');
        }

        function mint(uint256 id, uint256 amount) public onlyOwner {
            _mint(msg.sender, id, amount, '');
        }
    }
