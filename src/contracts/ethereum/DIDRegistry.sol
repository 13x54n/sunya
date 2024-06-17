// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DIDRegistry {
    struct DIDRecord {
        address owner;
        string didDocumentURI;
        bool exists;
    }

    mapping(string => DIDRecord) private didRecords;

    event DIDRegistered(string indexed did, address indexed owner, string didDocumentURI);
    event DIDUpdated(string indexed did, address indexed owner, string didDocumentURI);
    event DIDTransferred(string indexed did, address indexed from, address indexed to);

    modifier onlyOwner(string memory did) {
        require(didRecords[did].owner == msg.sender, "Sender is not the owner of the DID");
        _;
    }

    function registerDID(string memory did, string memory didDocumentURI) external {
        require(!didRecords[did].exists, "DID already registered");

        didRecords[did] = DIDRecord({
            owner: msg.sender,
            didDocumentURI: didDocumentURI,
            exists: true
        });

        emit DIDRegistered(did, msg.sender, didDocumentURI);
    }

    function updateDID(string memory did, string memory newDidDocumentURI) external onlyOwner(did) {
        didRecords[did].didDocumentURI = newDidDocumentURI;

        emit DIDUpdated(did, msg.sender, newDidDocumentURI);
    }

    function transferDID(string memory did, address newOwner) external onlyOwner(did) {
        require(newOwner != address(0), "Invalid new owner address");

        address currentOwner = didRecords[did].owner;
        didRecords[did].owner = newOwner;

        emit DIDTransferred(did, currentOwner, newOwner);
    }

    function getDIDOwner(string memory did) external view returns (address) {
        return didRecords[did].owner;
    }

    function getDIDDocumentURI(string memory did) external view returns (string memory) {
        return didRecords[did].didDocumentURI;
    }

    function isDIDRegistered(string memory did) external view returns (bool) {
        return didRecords[did].exists;
    }

    // Authentication methods

    function authenticate(string memory did, bytes memory signature) public view returns (bool) {
        bytes32 messageHash = prefixed(keccak256(abi.encodePacked(msg.sender, did)));
        return recoverSigner(messageHash, signature) == didRecords[did].owner;
    }

    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function recoverSigner(bytes32 hash, bytes memory signature) internal pure returns (address) {
        require(signature.length == 65, "Invalid signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        if (v < 27) {
            v += 27;
        }

        require(v == 27 || v == 28, "Invalid signature 'v' value");

        return ecrecover(hash, v, r, s);
    }
}
