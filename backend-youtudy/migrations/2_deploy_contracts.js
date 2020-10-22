const ConvertLib = artifacts.require("ConvertLib");
const YouCoin = artifacts.require("YouCoin");
const Badge = artifacts.require("Badge");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(YouCoin);
  deployer.deploy(Badge);
};
