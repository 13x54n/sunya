import os
from starkware.starknet.compiler.compile import compile_starknet_files
from starkware.starknet.services.api.contract_class import ContractClass

def compile_contract(contract_path: str) -> ContractClass:
    """Compiles a StarkNet contract."""
    compiled_contract_path = f"{contract_path}.json"
    compile_starknet_files(
        [contract_path],
        output_path=compiled_contract_path,
        cairo_path=[os.path.dirname(contract_path)]
    )
    with open(compiled_contract_path, "r") as file:
        return ContractClass.deserialize(file.read())
