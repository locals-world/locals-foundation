module.exports = function(deployer) {

		//	var fs = require('fs');
		var lightwallet = require('../node_modules/eth-lightwallet');
		var HookedWeb3Provider = require("../node_modules/hooked-web3-provider");

		//console.log(truffle);
		//	debugger;
		var contents = JSON.stringify(require('../wallet.json'));
		console.log(contents);
		var global_keystore = lightwallet.keystore.deserialize(contents);

		global_keystore.passwordProvider = function(callback) {
			console.log('PWD requested...');
			callback(null, 'test');
		};

		account = global_keystore.getAddresses()[0];
		console.log('Main account is ', account);

		lightwallet.keystore.deriveKeyFromPassword('test', function(err, pwDerivedKey) {


			var provider = new HookedWeb3Provider({
				host: 'http://109.123.70.141:8545',
				transaction_signer: global_keystore
			});


			var publickey = global_keystore.getAddresses()[0];
			console.log('deploy contract via', publickey);

			LocalsFoundationToken.setProvider(provider);
			LocalsFoundationToken.new().then(function(tx) {
				console.log('deploy', tx);
				// We just talked to the ethereum network!
			}).catch(function(err) {
				console.log("Error creating contract!");
				console.log(err.stack);
			})
		});
}

		//		deployer.deploy(LocalsFoundationToken);
		//		deployer.autolink();

		//		console.log