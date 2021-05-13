var ownerContract = artifacts.require("ownerContract");
var PinderCoin = artifacts.require("PinderCoin");
var Pets = artifacts.require("Pets");
module.exports = function(deployer) {
  deployer.deploy(ownerContract);
  deployer.deploy(PinderCoin);
  deployer.deploy(Pets);
};