// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardContract is Ownable {
    IERC20 public pillToken;
    IERC20 public kitToken;

    // Constructor para inicializar los contratos de tokens
    constructor(address _pillToken, address _kitToken) {
        pillToken = IERC20(_pillToken);
        kitToken = IERC20(_kitToken);
    }

    // Función para recompensar a los jugadores
    function rewardPlayer(address player, uint256 pillAmount, uint256 kitAmount) external onlyOwner {
        require(pillToken.balanceOf(address(this)) >= pillAmount, "Insufficient Pill tokens in contract");
        require(kitToken.balanceOf(address(this)) >= kitAmount, "Insufficient Kit tokens in contract");

        // Transferir los tokens Pill
        if (pillAmount > 0) {
            bool pillTransferSuccess = pillToken.transfer(player, pillAmount);
            require(pillTransferSuccess, "Pill token transfer failed");
        }

        // Transferir los tokens Kit
        if (kitAmount > 0) {
            bool kitTransferSuccess = kitToken.transfer(player, kitAmount);
            require(kitTransferSuccess, "Kit token transfer failed");
        }
    }

    // Función para depositar tokens en el contrato (solo puede ser llamada por el propietario)
    function depositTokens(uint256 pillAmount, uint256 kitAmount) external onlyOwner {
        require(pillToken.transferFrom(msg.sender, address(this), pillAmount), "Pill token transfer failed");
        require(kitToken.transferFrom(msg.sender, address(this), kitAmount), "Kit token transfer failed");
    }
}