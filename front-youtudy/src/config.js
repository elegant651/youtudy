const Badge = require('./contracts/Badge')
const Youtudy = require('./contracts/Youtudy')
const YouCoin = require('./contracts/YouCoin')

export default {
	BADGE_CA: Badge.deployedAddress,
	YOUTUDY_CA: Youtudy.deployedAddress,
	YOUCOIN_CA: YouCoin.deployedAddress,

	BADGE_ABI: Badge.abiDefinition,
	YOUTUDY_ABI: Youtudy.abiDefinition,
	YOUCOIN_ABI: YouCoin.deployedAddress,	

	GAS_AMOUNT: 5000000
}
