contract('LocalsFoundationToken', function(accounts) {
	console.log('hello',accounts);
	it("should assert true", function(done) {
		var contract = LocalsFoundationToken.deployed();
		console.log('address',contract);

		contract.balanceOf.call(accounts[0]).then(function(balance) {
			assert.equal(balance.valueOf(), 50000, "50000 wasn't in the first account");
		});

		done();
	});
});