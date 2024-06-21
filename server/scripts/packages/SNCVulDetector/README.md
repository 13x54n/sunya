# SNCVulDetector - Starknet Contract Vulnerability Detector
This directory contains the custom detector performing static analysis for cairo smart contracts.

### Manual Check for Bad Contract.
Get into directory -> `packages/SNVVulDetector/src`

```bash
pip install transformers[torch]
```

```bash
python3 model_training.py
```

```bash
python3 debug_inference.py
```