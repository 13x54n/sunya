from transformers import RobertaTokenizer

def tokenize_code(data, tokenizer):
    tokenized_data = [tokenizer.tokenize(code) for code in data]
    return tokenized_data

def main():
    detectors_path = 'D:/Starkhack/sunya/packages/detectors'
    contracts_path = 'D:/Starkhack/sunya/packages/ExamplesVulnerableContracts'
    data, labels, detector_data = prepare_data(detectors_path, contracts_path)

    tokenizer = RobertaTokenizer.from_pretrained('microsoft/codebert-base')
    tokenized_data = tokenize_code(data, tokenizer)
    tokenized_detectors = tokenize_code(detector_data, tokenizer)

    return tokenized_data, labels, tokenized_detectors

if __name__ == '__main__':
    tokenized_data, labels, tokenized_detectors = main()
    print(tokenized_data)
    print(labels)
    print(tokenized_detectors)
