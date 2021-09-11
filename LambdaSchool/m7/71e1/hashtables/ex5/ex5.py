cache = {}


def search_files(x, y, result):
    result.append(x)
    cache.update({y: x})

def finder(files, queries):
    result = []
    for y in queries:
        if y in cache.items():
            result.append(cache(y))
        else:
            for x in files:
                current_comparison = x[-len(y):]
                if y == current_comparison:
                    search_files(x, y, result)       

    return result
    '''
    file3490
    if query contains digits 
        get digits from query 
        get rid of word file & leave number   
    '''

if __name__ == "__main__":
    files = [
        '/bin/foo',
        '/bin/bar',
        '/usr/bin/baz'
    ]
    queries = [
        "foo",
        "qux",
        "baz"
    ]
    print(finder(files, queries))
