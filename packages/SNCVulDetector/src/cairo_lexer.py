# SNCVulDetector/src/cairo_lexer.py
from pygments.lexer import RegexLexer
from pygments.token import Text, Comment, Keyword, Name, String, Number, Operator, Punctuation

class CairoLexer(RegexLexer):
    name = 'Cairo'
    aliases = ['cairo']
    filenames = ['*.cairo']
    
    tokens = {
        'root': [
            (r'\s+', Text),
            (r'#.*$', Comment.Single),
            (r'(struct|fn|let|return|mod|impl|use|trait|pub|enum|impl|for|while|loop|if|else|match|self|super|ref|as|const|static|macro_rules)\b', Keyword),
            (r'(i8|i16|i32|i64|i128|u8|u16|u32|u64|u128|usize|isize|bool|char|str|String|vec|Vec|Option|Result)\b', Keyword.Type),
            (r'@[a-zA-Z_][a-zA-Z0-9_]*', Name.Decorator),
            (r'[a-zA-Z_][a-zA-Z0-9_]*', Name),
            (r'"(\\\\|\\"|[^"])*"', String),
            (r'\'(\\\\|\\\'|[^\'])*\'', String.Char),
            (r'\d+', Number),
            (r'[=+\-*/%!<>|&^~]', Operator),
            (r'[\[\]{}(),;]', Punctuation),
        ],
    }
