# **L-earnings DApp**

Welcome to **L-earnings**! This decentralized application enables users to request and receive refunds based on their quiz performance in an educational system. Built on Ethereum, **L-earnings** ensures transparency and security in managing refunds through smart contracts.

---

## **Features**

### Frontend
- **Elegant UI**: User-friendly and responsive interface.
- **Wallet Integration**: Seamless MetaMask integration for blockchain interaction.
- **Dynamic Feedback**: Display of refund percentages based on user scores.

### Smart Contract
- **Secure Fund Management**: Handles deposits, refund requests, and processing securely.
- **Owner-Managed Refunds**: Only the contract owner can process refund requests.
- **Balance Transparency**: View the contract's available funds for user confidence.

---

## **Technologies Used**

### **Frontend**
- **HTML**, **CSS**, and **JavaScript**
- **Web3.js** and **Ethers.js** for Ethereum blockchain interaction.
- MetaMask for wallet connectivity.

### **Smart Contract**
- **Solidity**: Ethereum smart contract development.
- **Truffle Suite**: For contract compilation, deployment, and testing.

---

## **How It Works**

### 1. **Deposit Funds**
   - The contract owner or any user can deposit funds into the smart contract.

### 2. **Refund Request**
   - Users can enter their wallet address and request a refund based on their quiz performance.
   - Refund amounts are calculated as a percentage of the course fee.

### 3. **Refund Processing**
   - The owner reviews and processes refund requests.
   - The contract ensures sufficient funds before approving transfers.

### 4. **Transparency**
   - Users can view the contract balance to ensure accountability.

---

## **Smart Contract Details**

### Key Functions

| Function           | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `deposit()`        | Allows users to deposit funds into the contract.                           |
| `requestRefund()`  | Users can request a refund by specifying an amount.                        |
| `processRefund()`  | Allows the owner to process a refund for a specific user.                  |
| `getContractBalance()` | Returns the current balance of the contract.                            |

---

## **Screenshots**

### Refund Request Page
![Refund Request Page](screenshots/refund-request.png)

### Refund Confirmation
![Refund Confirmation](screenshots/refund-confirmation.png)

---

## **Roadmap**

### Planned Enhancements:
- **Automated Refunds**: Enable automatic processing of refunds based on predefined rules.
- **Multi-Network Support**: Add compatibility for other blockchains like Polygon and Binance Smart Chain.
- **Enhanced User Analytics**: Provide detailed user performance reports within the app.
- **Gas Optimization**: Refactor smart contracts for reduced transaction costs.

---

## **Contributing**

We welcome contributions to improve **L-earnings**! Here's how you can contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit and push your changes.
4. Open a pull request for review.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## **Contact**

For any queries, suggestions, or feedback:
- **Email**: rishabraj182003@gmail.com


---

Thank you for choosing **L-earnings**! 🚀 Empowering education, one refund at a time. 
