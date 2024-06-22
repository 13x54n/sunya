#!/bin/bash
# Read command-line arguments
repo_url=$1
repo_name=$2
target_dir=$3

# Validate input
if [ -z "$repo_url" ]; then
    echo "Error: Git repository URL is required."
    exit 1
fi

if [ -z "$repo_name" ]; then
    echo "Error: Repository name is required."
    exit 1
fi

if [ -z "$target_dir" ]; then
    echo "Error: Target directory is required."
    exit 1
fi

# Ensure target directory exists; create it if it doesn't
mkdir -p "$target_dir"

# Change directory to the target directory
cd "$target_dir" || exit

# Clone repository
git clone "$repo_url" "$repo_name"

# Check if cloning was successful
if [ $? -ne 0 ]; then
    echo "Failed to clone repository. Please check the URL and try again."
    exit 1
fi

# Change directory to the cloned repository
cd "$repo_name" || exit

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Variables to track configurations found
scarb_found=false
hardhat_found=false

# Check if Scarb.toml exists
if [ -f "Scarb.toml" ]; then
    echo "Hello from Scarb!"
    scarb_found=true
fi

# Check if hardhat.config.js exists
if [ -f "hardhat.config.js" ]; then
    echo "Hello from Hardhat!"
    hardhat_found=true
fi

# Determine which configurations are found
if [ "$scarb_found" = true ] && [ "$hardhat_found" = true ]; then
    echo "Both Scarb and Hardhat configurations detected! Currently you can only audit one at a time!"
elif [ "$scarb_found" = true ]; then
    echo "Scarb configuration detected."
    cd "$SCRIPT_DIR/SNCVulDetector/src" || exit
    pip install transformers[torch]
    python3 model_training.py
    python3 debug_inference.py
elif [ "$hardhat_found" = true ]; then
    echo "Hardhat configuration detected."
    # Assuming installation command for Hardhat (bun, yarn, or npm)
    bun install || yarn install || npm install

    # Perform slither analysis and redirect output to a file
    slither .
else
    echo "We currently support projects configured with Scarb, and Hardhat only!"
fi
