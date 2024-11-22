// test/educationalRefund.test.js
const EducationalRefund = artifacts.require("EducationalRefund");

contract("EducationalRefund", (accounts) => {
    let contract;
    const owner = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];

    before(async () => {
        contract = await EducationalRefund.new();
    });

    it("should deposit funds", async () => {
        await contract.deposit({ from: owner, value: web3.utils.toWei("1", "ether") });
        const balance = await contract.getContractBalance();
        assert.equal(balance.toString(), web3.utils.toWei("1", "ether"), "The contract balance should be 1 Ether");
    });

    it("should allow a user to request a refund", async () => {
        await contract.requestRefund(web3.utils.toWei("0.5", "ether"), { from: user1 });
        const refundAmount = await contract.refunds(user1);
        assert.equal(refundAmount.toString(), web3.utils.toWei("0.5", "ether"), "Refund amount should be 0.5 Ether");
    });

    it("should process the refund", async () => {
        const initialBalance = await web3.eth.getBalance(user1);
        const tx = await contract.processRefund(user1, { from: owner });
        
        // Calculate gas used in the transaction
        const gasUsed = tx.receipt.gasUsed;
        const gasPrice = tx.receipt.effectiveGasPrice; // Getting the effective gas price
        const totalGasCost = gasUsed * gasPrice; // Total cost of gas
    
        const newBalance = await web3.eth.getBalance(user1);
        const refundAmount = web3.utils.toWei("0.5", "ether");
        
        // Check if new balance is greater than initial balance + refund amount - gas costs
        assert.isTrue(
            parseFloat(newBalance) > parseFloat(initialBalance) + parseFloat(refundAmount) - parseFloat(totalGasCost),
            "User balance should increase by refund amount"
        );
    });
    
});
