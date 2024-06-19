# SNCVulDetector/src/main.py
import os
from utils import read_code_file, tokenize_code, jaccard_similarity, detect_unused_arguments_ast

def get_files_in_directory(directory):
    if not os.path.exists(directory):
        raise FileNotFoundError(f"The directory {directory} does not exist")
    return [os.path.join(directory, f) for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]

def main():
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    detectors_path = os.path.join(base_path, 'detectors')
    contracts_path = os.path.join(base_path, 'ExamplesVulnerableContracts')
    
    # Debug prints
    print(f"Base path: {base_path}")
    print(f"Detectors path: {detectors_path}")
    print(f"Contracts path: {contracts_path}")
    
    detector_files = get_files_in_directory(detectors_path)
    contract_files = get_files_in_directory(contracts_path)
    
    for contract_file in contract_files:
        contract_code = read_code_file(contract_file)
        print(f"Read contract file: {contract_file}")

        for detector_file in detector_files:
            detector_code = read_code_file(detector_file)
            print(f"Read detector file: {detector_file}")
            
            # Detect unused arguments using AST
            has_unused_args, unused_args = detect_unused_arguments_ast(contract_code)
            if has_unused_args:
                print(f"Potential unused argument vulnerability detected in {contract_file}")
                print(f"Unused arguments: {unused_args}")
                continue
            
            # Tokenize
            contract_tokens = tokenize_code(contract_code, language='cairo')
            detector_tokens = tokenize_code(detector_code, language='cairo')
            
            # Debug prints for tokens
            # print(f"Contract Tokens for {contract_file}: {contract_tokens}")
            # print(f"Detector Tokens for {detector_file}: {detector_tokens}")
            
            # Compare similarity
            similarity = jaccard_similarity(contract_tokens, detector_tokens)
            print(f"Similarity between {contract_file} and {detector_file}: {similarity}")
            
            if similarity > 0.3:  # Threshold for similarity, adjust as needed
                print(f"Potential vulnerability detected in {contract_file} by {detector_file}")
                print(f"Similarity: {similarity}")
                print(f"Contract Tokens: {contract_tokens}")
                print(f"Detector Tokens: {detector_tokens}")

if __name__ == '__main__':
    main()
