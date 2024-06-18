# Writing install scripts for Linux & Unix 
#!/bin/bash

# Check if Rust is installed
if ! command -v rustc &> /dev/null
then
    echo "Rust is not installed. Installing Rust..."

    # Install Rust using rustup (recommended method)
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

    # Add Cargo's bin directory to the PATH environment variable
    source $HOME/.cargo/env

    echo "Rust has been successfully installed."
else
    echo "Rust is already installed. Skipping installation."
fi

# Display Rust version
echo "Rust version:"
rustc --version
cargo --version  # Optionally, display Cargo version too

cargo install --git https://github.com/crytic/caracal --profile release --force

python3 -m venv venv
source ./venv/bin/activate
python3 -m pip install slither-analyzer