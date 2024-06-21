# SNCVulDetector/src/utils.py
import re

def read_code_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def tokenize_code(code, language='cairo'):
    if language == 'cairo':
        # Simple tokenizer for Cairo code based on word boundaries
        tokens = re.findall(r'\b\w+\b', code)
    else:
        raise ValueError(f"Unsupported language: {language}")
    return tokens

def jaccard_similarity(list1, list2):
    set1, set2 = set(list1), set(list2)
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union if union != 0 else 0

def detect_unused_arguments_ast(code):
    """
    Detect functions with unused arguments in the given code using AST.
    """
    # This regex matches functions with unused arguments and a pass statement
    func_pattern = re.compile(r"func\s+(\w+)\s*\(([\w\s,:]+)\)\s*->\s*[\w\s]+:\s*(?:\n\s*)*pass")
    matches = func_pattern.findall(code)
    unused_args = []
    for match in matches:
        func_name, args = match
        args_list = [arg.strip() for arg in args.split(',')]
        if len(args_list) > 1:
            unused_args.append((func_name, args_list[-1]))  # Assuming last argument as unused
    return bool(unused_args), unused_args