// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./SimpleStorage.sol";
contract StorageFactory {

    // SimpleStorage public simplestorage;
    SimpleStorage[] public storages;

    function createSimpleStorageContract() public {

        SimpleStorage simplestorage=new SimpleStorage();
        storages.push(simplestorage);
    }

    function sfStore(uint256 _simpleStorageIndex,uint256 _simpleStorageNumber) public {
        SimpleStorage simplestorage =storages[_simpleStorageIndex];
        simplestorage.store(_simpleStorageNumber);

    }

    function sfgetNumber (uint256 _simpleStorageIndex) public view returns(uint256) {
        SimpleStorage simplestorage =storages[_simpleStorageIndex];
        return simplestorage.retrieve();
    }


}
