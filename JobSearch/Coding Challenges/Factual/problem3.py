# Many of the projects that we develop rely on other libraries to bring in common functionality and increase code reuse instead of reinventing the Wheel. Sometimes there are popular libraries that are used by more than one of our projects.

# Before we can build specific project we need to first build all of its dependencies. Given a list of modules that we want to build and a map mapping a project or library to its dependencies, can you output the minimum number of projects we need to build in order to build the input modules? Make sure to include the input modules in your total length.
# Example mapping modules to their dependencies:

# factual-commons => [apache-commons, guava, thrift]
# map-reduce => [apache-commons, hadoop]
# place-attach => [factual-commons, map-reduce]
# hive => [hadoop, apache-commons]
# hive-querier => [hive, factual-commons]

# If we wanted to build "Hive-querier" then we could build:
# [hadoop, apache-commons, hive, guava, thrift, factual-commons, hive-querier]

# in that order for this example would be 7

def mapifyArgument(arg):
    map = {}
    for i in range(0, len(arg)):
        module = arg[i][0]
        dep = arg[i][1]
        if not module in map:
            map[module] = []
        map[module].append(dep)
    return map
    
def solution(modulesToBuild, dependencies):
    deps = mapifyArgument(dependencies)
        
    # Type your solution here
    pass
