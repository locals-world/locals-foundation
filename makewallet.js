var lightwallet = require('eth-lightwallet');
var fs = require('fs');

var walletfile = './wallet.json';
var walletpassword = 'test';

if (!fs.existsSync(walletfile)) {
  console.log('file', walletfile, 'not found..');

  // maak nieuwe wallet en exit
  var secretSeed = lightwallet.keystore.generateRandomSeed();
  lightwallet.keystore.deriveKeyFromPassword(walletpassword, function(err, pwDerivedKey) {

    global_keystore = new lightwallet.keystore(secretSeed, pwDerivedKey);
    global_keystore.generateNewAddress(pwDerivedKey, 100);
    var keyStoreString = global_keystore.serialize();

    fs.writeFileSync(walletfile, keyStoreString);
    console.log("The keystore was saved! ==> ", walletfile);

    account = global_keystore.getAddresses()[0];

    console.log('your addresses',global_keystore.getAddresses());

    console.log('Your main account is ', account);
    console.log('now send this guy some ether in your geth client please');
//    console.log("eth.sendTransaction({from:eth.coinbase, to:'" + global_keystore.getAddresses()[0] + "',value: web3.toWei(500, \"ether\")})");

    console.log("Goodbye!");
    process.exit();
  });


} else {

  console.log('Keystore file found.');

}