
var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var BasicEscrow = artifacts.require("./BasicEscrow.sol");

const address1 = "0x6841EBBd0CBC33dcD114C548C99396710cc25e5B"

const address2 = "0x9ba1F32F809b6C58945Ada29d10cB82cA078C5E5"

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);

  /* deploy the escrow contract with 
    buyer: address9 (0x6841EBBd0CBC33dcD114C548C99396710cc25e5B), seller: address10 (0x9ba1F32F809b6C58945Ada29d10cB82cA078C5E5)
  */
  deployer.deploy(BasicEscrow, address1, address2) 
};