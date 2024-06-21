use starknet::ContractAddress;

#[starknet::interface]
pub trait IMapContract<TContractState> {
    fn set_audit(ref self: TContractState, key: felt252, value: felt252, _owner: felt252);
    fn get_audit(self: @TContractState, key: felt252) -> felt252;
    fn get_audit_owner(self: @TContractState, key: felt252) -> felt252;
}

#[starknet::contract]
pub mod MapContract {
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        audit: LegacyMap::<felt252, felt252>,
        owner: LegacyMap::<felt252, felt252>
    }

    #[abi(embed_v0)]
    impl MapContractImpl of super::IMapContract<ContractState> {
        fn set_audit(ref self: ContractState, key: felt252, value: felt252, _owner: felt252) {
            self.audit.write(key, value);
            self.owner.write(key, _owner)
        }

        fn get_audit(self: @ContractState, key: felt252) -> felt252 {
            self.audit.read(key)
        }

        fn get_audit_owner(self: @ContractState, key: felt252) -> felt252 {
            self.owner.read(key)
        }
    }
}
