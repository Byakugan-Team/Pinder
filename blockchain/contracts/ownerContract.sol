pragma solidity >=0.5.0;



contract ownerContract{
    address public owner;
    
    constructor() public {
        owner = msg.sender;
    }
    modifier onlyOwner(){
        if(msg.sender == owner)
            _;
    }

    function transferOwnership(address newOwner) public onlyOwner{
        if(newOwner != address(0)) owner = newOwner;
    }
}