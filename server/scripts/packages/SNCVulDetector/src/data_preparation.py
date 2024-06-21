import os

def read_code_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def get_files_in_directory(directory):
    if not os.path.exists(directory):
        raise FileNotFoundError(f"The directory {directory} does not exist")
    return [os.path.join(directory, f) for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]

def prepare_data(detectors_path, contracts_path):
    detectors_files = get_files_in_directory(detectors_path)
    contracts_files = get_files_in_directory(contracts_path)

    data = []
    labels = []
    for contract_file in contracts_files:
        contract_code = read_code_file(contract_file)
        data.append(contract_code)
        labels.append(contract_file)

    detector_data = []
    for detector_file in detectors_files:
        detector_code = read_code_file(detector_file)
        detector_data.append(detector_code)

    return data, labels, detector_data
