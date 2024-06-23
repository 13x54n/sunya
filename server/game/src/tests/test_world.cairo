#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use dojo::test_utils::{spawn_test_world, deploy_contract};
    use dojo_starter::{
        systems::{actions::{actions, IActionsDispatcher, IActionsDispatcherTrait}},
        models::{game::{Game, Choice, GameResult, game}}
    };

    #[test]
    fn test_play() {
        let caller = starknet::contract_address_const::<0x0>();
        let mut models = array![game::TEST_CLASS_HASH];
        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let actions_system = IActionsDispatcher { contract_address };

        // Spawn the game
        actions_system.spawn();

        // Play rock
        actions_system.play(Choice::Rock);

        // Check world state
        let game: Game = get!(world, caller, Game);

        assert(game.choice == Choice::Rock, 'choice is wrong');
        
        // Note: The result will always be a draw in this test because our mock
        // computer_choice always returns Rock. In a real implementation, you'd
        // want to test for all possible outcomes.
        assert(game.result == GameResult::Draw, 'result is wrong');
    }
}
