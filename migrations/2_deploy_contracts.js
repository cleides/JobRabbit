var JobRabbit = artifacts.require("JobRabbit");
var LibraryDemo = artifacts.require("LibraryDemo");

module.exports = function(deployer) {
  deployer.deploy(JobRabbit);
  deployer.deploy(LibraryDemo);
};