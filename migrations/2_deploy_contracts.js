var Buyer = artifacts.require("./Buyer.sol");
var Seller = artifacts.require("./Seller.sol");

module.exports = function (deployer) {
  deployer.deploy(Buyer);
  deployer.deploy(Seller);
};
