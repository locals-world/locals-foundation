module.exports = function(deployer) {


	var addresses = deployer.provider.transaction_signer.getAddresses();

	deployer.deploy(LocalsFoundationToken, 62200, 0, 'Locals Foundation Token', 'LFT').then(function() {
		console.log('instance', LocalsFoundationToken.address);

		var contract = LocalsFoundationToken.deployed();


		var balances = [
			8200,
			8200,
			8200,
			1000,
			1000,
			1000,
			1000,
			1000,
			1000,
			1000,
			5000,
			1000
		];


		balances.forEach(function(element, index, array) {
			contract.transfer('0x' + addresses[index + 1], element).then(function() {
				console.log('transfered ', element, 'to', addresses[index + 1]);

				contract.balanceOf.call('0x' + addresses[index+1]).then(function(balance) {
					console.log('balance of ',addresses[index+1],'=',balance.valueOf());
				});
				contract.balanceOf.call('0x' + addresses[0]).then(function(balance) {
					console.log('balance of ',addresses[0],'=',balance.valueOf());
				});

			});
		});


	});
}