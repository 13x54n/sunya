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

# Perform slither analysis and redirect output to a file
slither . > slither_output.txt 2>&1

# Check if slither analysis was successful
if [ $? -ne 0 ]; then
    echo "Failed to analyze code with slither."
    exit 1
fi

# Print the path to the output file
echo "$(pwd)/slither_output.txt"
