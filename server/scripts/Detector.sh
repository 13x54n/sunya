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

# Ensure target directory exists; create it if it doesn't
mkdir -p "$target_dir"

# Change directory to the target directory
cd "$target_dir" || exit

# Clone repository
git clone "$repo_url"

# Check if cloning was successful
if [ $? -eq 0 ]; then
    echo "Repository cloned successfully."
else
    echo "Failed to clone repository. Please check the URL and try again."
fi

# Perform slither analysis and redirect output to a file
slither . > slither_output.txt

# Check if slither analysis was successful
if [ $? -ne 0 ]; then
    echo "Failed to analyze code with slither."
    exit 1
fi

# Print the path to the output file
echo "$(pwd)/slither_output.txt"