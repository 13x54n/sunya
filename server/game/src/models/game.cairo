use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Game {
    #[key]
    player: ContractAddress,
    choice: Choice,
    result: GameResult,
}

#[derive(Serde, Copy, Drop, Introspect, PartialEq)]
enum Choice {
    None,
    Rock,
    Paper,
    Scissors,
}

#[derive(Serde, Copy, Drop, Introspect, PartialEq)]
enum GameResult {
    None,
    Win,
    Lose,
    Draw,
}

impl ChoiceIntoFelt252 of Into<Choice, felt252> {
    fn into(self: Choice) -> felt252 {
        match self {
            Choice::None => 0,
            Choice::Rock => 1,
            Choice::Paper => 2,
            Choice::Scissors => 3,
        }
    }
}

impl GameResultIntoFelt252 of Into<GameResult, felt252> {
    fn into(self: GameResult) -> felt252 {
        match self {
            GameResult::None => 0,
            GameResult::Win => 1,
            GameResult::Lose => 2,
            GameResult::Draw => 3,
        }
    }
}

