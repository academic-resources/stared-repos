import sys, os, string

result = []

with open(os.path.join(sys.path[0], 'input.txt'), 'r', encoding='utf8') as f:
    lines = f.readlines()
    for line in lines:
        parsed_line = ''
        is_last_whitespace = False
        for char in line:
            if char in string.whitespace:
                if is_last_whitespace:
                    continue
                is_last_whitespace = True
                parsed_line += ' '
            else:
                is_last_whitespace = False
                parsed_line += char
        result.append(parsed_line)

with open(os.path.join(sys.path[0], 'result.txt'), 'w', encoding='utf8') as fw:
    fw.writelines(f'{line}\n' for line in result)
