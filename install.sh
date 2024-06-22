#!/bin/bash

# Navigate to the project root directory (assuming the script is run from the project root)
cd "$(dirname "$0")"

# Install dependencies (one-time setup)
bun install

# Run the frontend
bun run dev &

# Navigate to the server directory and run the backend
cd server
node index.js

# Wait for both processes to complete (optional)
wait
