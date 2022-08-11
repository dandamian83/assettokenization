// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {

    constructor(uint256 initialSupply) ERC20("StarDucks Cappucion Token", "CAPPU") {
        _mint(msg.sender, initialSupply);
    }

    /**
     * Override decimals() function to change the number of decimals that our token contract has.   
     */
    function decimals() public view override returns(uint8) {
        return 0;
    }
}

