// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 number;

    struct People {
        string name;
        uint256 favouriteNumber;
    }

    People[] public persons;

    function store(uint256 num) public {
        number = num;
    }

    mapping(string => uint256) public nameToNumber;

    function retrieve() public view returns (uint256) {
        return number;
    }

    function addPerson(string memory _name, uint256 _number) public {
        persons.push(People(_name, _number));
        nameToNumber[_name] = _number;
    }
}
