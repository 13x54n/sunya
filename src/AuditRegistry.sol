// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract AuditRegistry{
    mapping(string => string) public audit;
    mapping(string => address) public owner;

    function set_audit(string memory _key, string memory _value, address _owner) public {
        audit[_key] = _value;
        owner[_key] = _owner;
    }

    function get_audit(string memory _key) public view returns (string memory) {
        return audit[_key];
    }

    function get_audit_owner(string memory _key) public view returns (address) {
        return owner[_key];
    }
}

// 0x9572f6b84DBBc89f83495431000aA175E94fc276 - sepolia verified w 