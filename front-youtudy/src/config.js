const Badge = require('./contracts/Badge')
const Youtudy = require('./contracts/Youtudy')
const YouCoin = require('./contracts/YouCoin')

export default {
	BADGE_CA: Badge.networks["80001"].address,
	YOUTUDY_CA: Youtudy.networks["80001"].address,
	YOUCOIN_CA: YouCoin.networks["80001"].address,

	BADGE_ABI: Badge.abi,
	YOUTUDY_ABI: Youtudy.abi,
	YOUCOIN_ABI: YouCoin.abi,

	GAS_AMOUNT: 5000000
}
