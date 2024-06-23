import random
import asyncio
import pygame
import math

# Try to import Starknet-related modules
try:
    from starkware.starknet.testing.starknet import Starknet
    from utils.compile_contract import compile_contract
    STARKNET_AVAILABLE = True
except ImportError:
    STARKNET_AVAILABLE = False

# Initialize Pygame
pygame.init()
info = pygame.display.Info()
WIDTH, HEIGHT = info.current_w, info.current_h
screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.FULLSCREEN)
pygame.display.set_caption("Rock Paper Scissors")

# Colors and Fonts
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE = (0, 122, 204)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
YELLOW = (255, 255, 0)

font = pygame.font.Font(None, 48)
large_font = pygame.font.Font(None, 96)
small_font = pygame.font.Font(None, 36)

# Load images
background = pygame.image.load("Background.png")
background = pygame.transform.scale(background, (WIDTH, HEIGHT))

rock_img = pygame.image.load("rock.webp")
paper_img = pygame.image.load("paper.webp")
scissor_img = pygame.image.load("scissor.webp")

# Scale images
button_size = (200, 200)
rock_img = pygame.transform.scale(rock_img, button_size)
paper_img = pygame.transform.scale(paper_img, button_size)
scissor_img = pygame.transform.scale(scissor_img, button_size)

def get_computer_choice():
    return random.choice(["rock", "paper", "scissors"])

def determine_winner(player_choice, computer_choice):
    if player_choice == computer_choice:
        return "Draw"
    elif (player_choice == "rock" and computer_choice == "scissors") or \
         (player_choice == "paper" and computer_choice == "rock") or \
         (player_choice == "scissors" and computer_choice == "paper"):
        return "Player Wins"
    else:
        return "Computer Wins"

def draw_button(screen, img, x, y, label):
    # Draw glass-like effect
    s = pygame.Surface(button_size, pygame.SRCALPHA)
    s.fill((255, 255, 255, 100))
    pygame.draw.rect(s, (*BLUE, 200), (0, 0, *button_size), border_radius=15)
    screen.blit(s, (x, y))
    
    # Add highlight
    pygame.draw.rect(screen, (255, 255, 255, 50), (x, y, button_size[0], button_size[1]//2), border_radius=15)
    
    # Draw the image
    screen.blit(img, (x, y))
    
    # Draw the label
    label_surface = small_font.render(label, True, BLACK)
    label_rect = label_surface.get_rect(center=(x + button_size[0]//2, y + button_size[1] + 30))
    screen.blit(label_surface, label_rect)

async def reveal_opponent_choice(choice):
    start_time = pygame.time.get_ticks()
    duration = 1500  # Animation duration in milliseconds
    
    while pygame.time.get_ticks() - start_time < duration:
        elapsed = pygame.time.get_ticks() - start_time
        progress = elapsed / duration
        
        # Fade-in effect
        alpha = int(255 * progress)
        
        screen.blit(background, (0, 0))
        text_surface = large_font.render(f"Opponent chose:", True, BLACK)
        choice_surface = large_font.render(choice.capitalize(), True, BLACK)
        text_surface.set_alpha(alpha)
        choice_surface.set_alpha(alpha)
        
        screen.blit(text_surface, (WIDTH/2 - text_surface.get_width()/2, HEIGHT/2 - 100))
        screen.blit(choice_surface, (WIDTH/2 - choice_surface.get_width()/2, HEIGHT/2))
        
        pygame.display.flip()
        await asyncio.sleep(0)

async def animate_result(result):
    start_time = pygame.time.get_ticks()
    duration = 2000  # Animation duration in milliseconds
    
    while pygame.time.get_ticks() - start_time < duration:
        elapsed = pygame.time.get_ticks() - start_time
        progress = elapsed / duration
        
        # Pulsating effect
        scale = 1 + 0.2 * math.sin(progress * 2 * math.pi)
        
        if result == "Player Wins":
            color = GREEN
            text = "You Won!"
        elif result == "Computer Wins":
            color = RED
            text = "You Lost!"
        else:
            color = BLUE
            text = "It's a Draw!"
        
        text_surface = large_font.render(text, True, color)
        text_rect = text_surface.get_rect(center=(WIDTH/2, HEIGHT/2))
        
        # Scale the text surface
        scaled_surface = pygame.transform.scale(text_surface, 
                                                (int(text_rect.width * scale), 
                                                 int(text_rect.height * scale)))
        scaled_rect = scaled_surface.get_rect(center=(WIDTH/2, HEIGHT/2))
        
        screen.blit(background, (0, 0))
        screen.blit(scaled_surface, scaled_rect)
        pygame.display.flip()
        
        await asyncio.sleep(0)

async def play_game_with_contract(game, choice):
    try:
        result = await game.play(choice).call()
        game_state = await game.get_game_state().call()
        return result.result, game_state.game_state.choice, game_state.game_state.result
    except:
        return None

async def main():
    clock = pygame.time.Clock()
    player_choice = computer_choice = result = None
    animating = False

    # Try to set up the Starknet contract
    if STARKNET_AVAILABLE:
        try:
            starknet = await Starknet.empty()
            contract = compile_contract("src/game.cairo")
            game = await starknet.deploy(contract)
        except:
            game = None
    else:
        game = None

    choice_map = {"rock": 0, "paper": 1, "scissors": 2}
    reverse_choice_map = {0: "rock", 1: "paper", 2: "scissors"}

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT or (event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE):
                pygame.quit()
                return
            if event.type == pygame.MOUSEBUTTONDOWN and not animating:
                x, y = pygame.mouse.get_pos()
                if WIDTH//2 - 300 <= x <= WIDTH//2 - 100 and HEIGHT - 300 <= y <= HEIGHT - 100:
                    player_choice = "rock"
                elif WIDTH//2 - 100 <= x <= WIDTH//2 + 100 and HEIGHT - 300 <= y <= HEIGHT - 100:
                    player_choice = "paper"
                elif WIDTH//2 + 100 <= x <= WIDTH//2 + 300 and HEIGHT - 300 <= y <= HEIGHT - 100:
                    player_choice = "scissors"
                
                if player_choice:
                    if game:
                        contract_result = await play_game_with_contract(game, choice_map[player_choice])
                        if contract_result:
                            _, computer_choice_num, contract_game_result = contract_result
                            computer_choice = reverse_choice_map[computer_choice_num]
                            result = ["Draw", "Player Wins", "Computer Wins"][contract_game_result]
                        else:
                            computer_choice = get_computer_choice()
                            result = determine_winner(player_choice, computer_choice)
                    else:
                        computer_choice = get_computer_choice()
                        result = determine_winner(player_choice, computer_choice)
                    animating = True

        if animating:
            await reveal_opponent_choice(computer_choice)
            await animate_result(result)
            animating = False
            player_choice = computer_choice = result = None
        else:
            screen.blit(background, (0, 0))
            draw_button(screen, rock_img, WIDTH//2 - 300, HEIGHT - 300, "Rock")
            draw_button(screen, paper_img, WIDTH//2 - 100, HEIGHT - 300, "Paper")
            draw_button(screen, scissor_img, WIDTH//2 + 100, HEIGHT - 300, "Scissors")

            prompt_text = "Select Rock, Paper, or Scissors"
            prompt_surface = font.render(prompt_text, True, BLACK)
            prompt_rect = prompt_surface.get_rect(center=(WIDTH//2, HEIGHT - 350))
            screen.blit(prompt_surface, prompt_rect)

            if player_choice:
                screen.blit(font.render(f"Player: {player_choice.capitalize()}", True, BLACK), (50, 100))
            if computer_choice:
                screen.blit(font.render(f"Computer: {computer_choice.capitalize()}", True, BLACK), (50, 150))
            if result:
                screen.blit(font.render(f"Result: {result}", True, BLACK), (50, 200))

            pygame.display.flip()

        clock.tick(60)
        await asyncio.sleep(0)

if __name__ == "__main__":
    asyncio.run(main())