const MyToken = artifacts.require("MyToken");

const chai = require("chai");
chai.use(require("chai-as-promised"));
const BN = web3.utils.BN;
chai.use(require("chai-bn")(BN));
const {expect} = chai;





contract("MyToken Test", async accounts => {

    const [deployerAccount, recipient, anotherAccount] = accounts;
 
    it("all tokens should be in my account", async () => {
        let instance = await MyToken.deployed();
        let totalSupply = await instance.totalSupply();
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
        expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(totalSupply);
    });

    it("is possible to send tokens between accounts", async () => {
        let instance = await MyToken.deployed();
        let senderBalance = await instance.balanceOf(deployerAccount);
        const sendingAmount = 3;
        expect(instance.transfer(recipient, sendingAmount)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.bignumber.equal(senderBalance.sub(new BN(sendingAmount)));
        expect(instance.balanceOf(recipient)).to.eventually.be.bignumber.equal(new BN(sendingAmount));
    });

    // it("is not possible to send more tokens than avaiable", async () => {
    //     expect(2).to.be.equal(2);
    //     let instance = await MyToken.deployed();
    // })

})
