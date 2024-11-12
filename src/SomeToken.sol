// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

contract ScrambledEggs is LSP7DigitalAsset {
    constructor() LSP7DigitalAsset("Scrambled eggs", "SCE", msg.sender, 0, false) {}

    function _transfer(
        address from,
        address to,
        uint256 amount,
        bool force,
        bytes memory data
    ) internal virtual override {
        revert("Token is soulbound - transfers are disabled");
    }
}
