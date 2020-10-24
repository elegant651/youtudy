const ConvertLib = artifacts.require("ConvertLib");
const YouCoin = artifacts.require("YouCoin");
const Badge = artifacts.require("Badge");
const Youtudy = artifacts.require("Youtudy");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, YouCoin);
  deployer.deploy(YouCoin);
  deployer.deploy(Badge);
  deployer.deploy(Youtudy);
};
