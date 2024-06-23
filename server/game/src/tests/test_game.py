import pytest
from starkware.starknet.testing.starknet import Starknet
from utils.compile_contract import compile_contract

@pytest.fixture(scope="module")
async def game_contract():
    starknet = await Starknet.empty()
    contract = compile_contract("src/game.cairo")
    game = await starknet.deploy(contract)
    return game

@pytest.mark.asyncio
async def test_play(game_contract):
    game = game_contract

    # Test playing Rock
    choice = 0  # Rock
    result = await game.play(choice).call()
    assert result.result == 0  # Draw, since computer choice is always Rock

    # Test getting game state
    game_state = await game.get_game_state().call()
    assert game_state.game_state.choice == choice
    assert game_state.game_state.result == result.result
