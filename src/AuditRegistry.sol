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

// 0x29C914081A8F642ea3aed092087095b08B304315 - sepolia verified 

// Set Audit Transaction
// https://sepolia.etherscan.io/tx/0xac1d5ead050baee0a6aa8b12c071b98fbedd392f089b261eb25249fd7651011a