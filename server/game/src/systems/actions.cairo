use dojo_starter::models::game::{Game, Choice, GameResult};
use core::debug::PrintTrait;

#[dojo::interface]
trait IActions {
    fn spawn(ref world: IWorldDispatcher);
    fn play(ref world: IWorldDispatcher, choice: Choice);
}

#[dojo::contract]
mod actions {
    use super::{IActions, Game, Choice, GameResult};
    use starknet::{ContractAddress, get_caller_address};

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    struct Played {
        #[key]
        player: ContractAddress,
        choice: Choice,
        result: GameResult,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref world: IWorldDispatcher) {
            let player = get_caller_address();
            set!(
                world,
                (Game {
                    player,
                    choice: Choice::None,
                    result: GameResult::None,
                })
            );
        }

        fn play(ref world: IWorldDispatcher, choice: Choice) {
            let player = get_caller_address();
            let mut game = get!(world, player, (Game));

            // Generate a random choice for the computer
            let computer_choice = generate_computer_choice();

            // Determine the game result
            let result = determine_result(choice, computer_choice);

            // Update the game state
            game.choice = choice;
            game.result = result;

            set!(world, (game));

            // Emit an event
            emit!(world, (Played { player, choice, result }));
        }
    }

    fn generate_computer_choice() -> Choice {
        // In a real implementation, you'd want to use a proper random number generator
        // For simplicity, we'll use a mock implementation here
        Choice::Rock
    }

    fn determine_result(player_choice: Choice, computer_choice: Choice) -> GameResult {
        if player_choice == computer_choice {
            return GameResult::Draw;
        }

        match (player_choice, computer_choice) {
            (Choice::Rock, Choice::Scissors) => GameResult::Win,
            (Choice::Paper, Choice::Rock) => GameResult::Win,
            (Choice::Scissors, Choice::Paper) => GameResult::Win,
            _ => GameResult::Lose,
        }
    }
}