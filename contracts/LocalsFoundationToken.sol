/*
You should inherit from StandardToken or, for a token like you would want to
deploy in something like Mist, see HumanStandardToken.sol.
(This implements ONLY the standard functions and NOTHING else.
If you deploy this, you won't have anything useful.)

Implements ERC 20 Token standard: https://github.com/ethereum/EIPs/issues/20
.*/

import "Token.sol";
import "owned.sol";

contract LocalsFoundationToken is Token,owned  {
 
    mapping (address => bool) public whitelist;


    function LocalsFoundationToken(
        uint256 initialSupply,
        string tokenName,
        uint8 decimalUnits,
        uint256 _minEthbalance,
        string tokenSymbol,
        string versionOfTheCode
        ) {
        // balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
        // totalSupply = initialSupply;                        // Update total supply
        // name = tokenName;                                   // Set the name for display purposes
        // symbol = tokenSymbol;                               // Set the symbol for display purposes
        // decimals = decimalUnits;                            // Amount of decimals for display purposes
        // version = versionOfTheCode;
        // minEthbalance = _minEthbalance;
        // owner = msg.sender;
        // whitelist[msg.sender];
    }

    function transfer(address _to, uint256 _value) returns (bool success) {
        //Default assumes totalSupply can't be over max (2^256 - 1).
        //If your token leaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn't wrap.
        //Replace the if with this one instead.
        //if (balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        if (balances[msg.sender] >= _value && _value > 0) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        } else { return false; }
    }

    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        //same as above. Replace this line with the following if you want to protect against wrapping uints.
        //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }

    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
      return allowed[_owner][_spender];
    }


    function mintToken(address target, uint256 mintedAmount) {
        if(!whitelist[msg.sender]) throw;
        balances[target] += mintedAmount;
        totalSupply += mintedAmount;
        //checkEthBalance(target);
        Transfer(0, owner, mintedAmount);
        Transfer(owner, target, mintedAmount);
    }

    // add an address to the list who can mint tokens.
    function addToWhitelist(address _whitelistaddr) onlyOwner {
        whitelist[_whitelistaddr] = true;
    }


    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
}
