pragma solidity >=0.5.0;
import './ownerContract.sol';


contract PinderCoin is ownerContract{
    address[1000] users;
    mapping(address => int) PinderCoins;
    function offer(int amount) public view returns(bool possible){
        if (PinderCoins[msg.sender] < amount) return false;
        return true;
    }

    function deposit(address receiver, int amount) public onlyOwner  returns(bool sufficient) {
		PinderCoins[receiver] += amount;
		return true;
	}
    function sendCoin(address receiver, int amount) public  returns(bool sufficient) {
		if (PinderCoins[msg.sender] < amount) return false;
		PinderCoins[msg.sender] -= amount;
		PinderCoins[receiver] += amount;
		return true;
	}
    

   

    function NewUser(uint256 User_Id) public  {
            users[User_Id] = msg.sender;
            PinderCoins[msg.sender] = 0;
            
    }

    function getBalance() public view returns(int) {
            int amount = PinderCoins[msg.sender];
        	return amount;
	}
}