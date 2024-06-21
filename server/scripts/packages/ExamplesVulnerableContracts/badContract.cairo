# Define the storage struct
struct Storage {
    stored_data: felt,
    library_hash: felt
}

# Define the contract interface
#[starknet::interface]
trait IControlledLibraryCall {
    fn set_library_hash(ref self: Storage, hash: felt);
    fn call_library_function(self: Storage, user_hash: felt);
    fn get_unused_value(self: Storage) -> felt;  # New function returning an unused value
}

# Define the contract implementation
#[starknet::contract]
mod ControlledLibraryCall {
    use starknet::storage;

    #[storage]
    struct Storage {
        stored_data: felt,
        library_hash: felt,
    }

    #[abi(embed_v0)]
    impl IControlledLibraryCall for ContractState {
        fn set_library_hash(ref self: Storage, hash: felt):
            self.library_hash.write(hash);

        fn call_library_function(self: Storage, user_hash: felt):
            # Vulnerability: library call with user-controlled hash
            let class_hash = user_hash;  # This should be verified or controlled securely
            library_call(class_hash);

        fn get_library_hash(self: Storage) -> felt:
            self.library_hash.read();

        fn get_unused_value(self: Storage) -> felt:
            return 42;  # Return a value that will not be used
    }
}

# Define the main function
func main():
    let storage = Storage {
        stored_data: 0,
        library_hash: 0
    };

    ControlledLibraryCall::set_library_hash(storage, 987654321);  # Set a library hash
    ControlledLibraryCall::call_library_function(storage, 123456789);  # Call with user-controlled hash

    let stored_hash = ControlledLibraryCall::get_library_hash(storage);
    assert stored_hash == 987654321;

    ControlledLibraryCall::get_unused_value(storage);  # Call function but do not use the return value

    return ();
end
