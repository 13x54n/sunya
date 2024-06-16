%lang starknet

@contract
namespace SimpleContract {

    @storage_var
    func balance() -> (res: felt) {}

    @external
    func increase_balance(amount: felt) {
        let (current_balance) = balance.read();
        let new_balance = current_balance + amount;
        balance.write(new_balance);
    }

    @external
    func get_balance() -> (res: felt) {
        let (current_balance) = balance.read();
        return (current_balance);
    }
}
