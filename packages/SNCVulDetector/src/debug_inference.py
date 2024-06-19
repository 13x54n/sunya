import torch
from transformers import RobertaForSequenceClassification, RobertaTokenizer

# Correct model directory path
model_dir = "src/results"

# Load the tokenizer and model
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
model = RobertaForSequenceClassification.from_pretrained(model_dir)
model.eval()  # Set model to evaluation mode

# Load the contract for inference
contract_path = "D:\\Starkhack\\sunya\\packages\\ExamplesVulnerableContracts\\badContract.cairo"
with open(contract_path, "r", encoding='utf-8', errors='ignore') as f:
    contract_code = f.read()

# Tokenize the contract code
inputs = tokenizer(contract_code, return_tensors="pt", padding=True, truncation=True)

# Print tokenized inputs to debug
print("Tokenized Inputs:", inputs)

# Perform inference
with torch.no_grad():
    outputs = model(**inputs)

# Print model outputs to debug
print("Model Outputs:", outputs)

# Convert model outputs to predictions
predictions = torch.argmax(outputs.logits, dim=-1)

# Print predictions to debug
print("Predictions:", predictions.tolist())
