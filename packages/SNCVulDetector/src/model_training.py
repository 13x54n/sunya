import os
from transformers import RobertaForSequenceClassification, Trainer, TrainingArguments, RobertaTokenizer
import torch
from torch.utils.data import Dataset
import json

class VulnerabilityDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        item = {key: val[idx] for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

def read_code_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
        return file.read()

def prepare_data(detectors_path, contracts_path, tokenizer):
    detector_files = [os.path.join(detectors_path, f) for f in os.listdir(detectors_path) if os.path.isfile(os.path.join(detectors_path, f))]
    contract_files = [os.path.join(contracts_path, f) for f in os.listdir(contracts_path) if os.path.isfile(os.path.join(contracts_path, f))]

    combined_codes = []
    labels = []

    for label, detector_file in enumerate(detector_files):
        print(f"Label {label}: {detector_file}")
        detector_code = read_code_file(detector_file)
        for contract_file in contract_files:
            contract_code = read_code_file(contract_file)
            combined_code = detector_code + '\n' + contract_code
            combined_codes.append(combined_code)
            labels.append(label)

    encodings = tokenizer(combined_codes, padding='max_length', truncation=True, return_tensors='pt')
    return encodings, labels

def train_model(encodings, labels):
    model = RobertaForSequenceClassification.from_pretrained('microsoft/codebert-base', num_labels=len(set(labels)))

    training_args = TrainingArguments(
        output_dir='./results',
        num_train_epochs=3,
        per_device_train_batch_size=4,
        warmup_steps=500,
        weight_decay=0.01,
        logging_dir='./logs',
        logging_steps=10,
    )

    dataset = VulnerabilityDataset(encodings, labels)
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=dataset,
    )

    trainer.train()
    trainer.save_model('./results')

def main():
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    detectors_path = os.path.join(base_path, 'detectors')
    contracts_path = os.path.join(base_path, 'ExamplesVulnerableContracts')
    
    tokenizer = RobertaTokenizer.from_pretrained('microsoft/codebert-base')
    
    encodings, labels = prepare_data(detectors_path, contracts_path, tokenizer)
    print(f"Prepared {len(labels)} samples with {len(set(labels))} unique labels.")
    train_model(encodings, labels)

    # Save the tokenizer to the results directory
    os.makedirs("./results", exist_ok=True)
    tokenizer.save_pretrained("./results")

if __name__ == '__main__':
    main()
