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

bun install || yarn install || npm install

# Perform slither analysis and redirect output to a file
# slither . > slither_output.log 2>&1


# slither .

python3 /mnt/e/Hackathon/sunya/packages/SNCVulDetector/src/debug_inference.py > debug_output.log 2>&1

