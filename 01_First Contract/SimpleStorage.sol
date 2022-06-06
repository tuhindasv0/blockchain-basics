// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;


contract Storage {

    //Declaring Var
    uint256 number;

    /* 
    Struct
    Solidity allows user to create their own data type in the form of structure. The struct contains a group
    of elements with a different data type. Generally, it is used to represent a record. To define a structure 
    struct keyword is used, which creates a new data type. 
    */
    struct People {
        string name;
        uint256 favouriteNumber;
    }

    People[] public persons;

    function store(uint256 num) public {
        number = num;
    }
    /*
    Mapping in Solidity acts like a hash table or dictionary in any other language. These are used to store the data 
    in the form of key-value pairs, a key can be any of the built-in data types but reference types are not allowed
    while the value can be of any type. Mappings are mostly used to associate the unique Ethereum address with the 
    associated value type.
    */
    mapping(string => uint256) public nameToNumber;

    function retrieve() public view returns (uint256){
        return number;
    }

    function addPerson(string memory _name,uint256 _number) public {
        persons.push(People(_name,_number));
        nameToNumber[_name]=_number;

    } 
}