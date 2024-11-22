// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EducationalRefund {
    address public owner;

    // Mapping to store refund amounts for users
    mapping(address => uint256) public refunds;

    // Event to log refund requests
    event RefundRequested(address indexed user, uint256 amount);
    event RefundProcessed(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender; // Set the contract creator as the owner
    }

    // Function to deposit funds into the contract
    function deposit() external payable {
        require(msg.value > 0, "Must send ETH to deposit");
    }

    // Function to request a refund
    function requestRefund(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(refunds[msg.sender] == 0, "Refund already requested");

        refunds[msg.sender] = _amount; // Store the refund amount for the user
        emit RefundRequested(msg.sender, _amount);
    }

    // Function to process the refund
    function processRefund(address payable _user) external {
        uint256 refundAmount = refunds[_user];
        require(refundAmount > 0, "No refund available");
        require(address(this).balance >= refundAmount, "Insufficient contract balance");

        // Reset the refund amount to prevent re-entrancy attacks
        refunds[_user] = 0;

        // Transfer the refund amount to the user
        _user.transfer(refundAmount);
        emit RefundProcessed(_user, refundAmount);
    }

    // Function to get the contract balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
