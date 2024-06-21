import os
import torch
from transformers import RobertaForSequenceClassification, RobertaTokenizer

def read_code_file(filepath):
    with open(filepath, 'r') as file:
        return file.read()

def tokenize_code(tokenizer, code):
    return tokenizer(code, padding='max_length', truncation=True, return_tensors='pt')

def load_model_and_tokenizer(model_path):
    model = RobertaForSequenceClassification.from_pretrained(model_path)
    tokenizer = RobertaTokenizer.from_pretrained('microsoft/codebert-base')
    return model, tokenizer

def predict_vulnerabilities(model, tokenizer, contract_code, detector_codes):
    model.eval()
    results = []
    for detector_code in detector_codes:
        combined_code = detector_code + '\n' + contract_code
        inputs = tokenize_code(tokenizer, combined_code)
        with torch.no_grad():
            outputs = model(**inputs)
            predictions = torch.argmax(outputs.logits, dim=-1).item()
            results.append(predictions)
    return results

def main():
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    detectors_path = os.path.join(base_path, 'detectors')
    contracts_path = os.path.join(base_path, 'ExamplesVulnerableContracts')
    model_path = './results'  # Path to the trained model

    # Load model and tokenizer
    model, tokenizer = load_model_and_tokenizer(model_path)

    # Read detector files
    detector_files = [os.path.join(detectors_path, f) for f in os.listdir(detectors_path) if os.path.isfile(os.path.join(detectors_path, f))]
    detector_codes = [read_code_file(f) for f in detector_files]

    # Read and predict vulnerabilities in contract files
    contract_files = [os.path.join(contracts_path, f) for f in os.listdir(contracts_path) if os.path.isfile(os.path.join(contracts_path, f))]
    for contract_file in contract_files:
        contract_code = read_code_file(contract_file)
        predictions = predict_vulnerabilities(model, tokenizer, contract_code, detector_codes)
        print(f'Predictions for {contract_file}: {predictions}')

if __name__ == '__main__':
    main()
