pragma solidity >=0.5.0;


contract Pets  {

    address[1000] owners;
    
    function NewPet(uint petId) public returns (uint) {
            owners[petId] = msg.sender;

            return petId;
    }

    function changeOwner(uint petId , address to) public returns (uint) {
        require(owners[petId] == msg.sender);

        owners[petId] = to;

        return petId;
    }


    function getowners() public view returns (address[1000] memory) {
        return owners;
    }

    
}