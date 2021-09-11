# Hash Directory
# Suppose a hash representing a directory. All keys are strings with names for either folders or files. Keys that are folders point to nested hashes. Keys that are files point to "true". Write a function that takes such a hash and returns an array of strings with the path to each file in the hash.

# Example:

# files = {
#   'a' => {
#     'b' => {
#       'c' => {
#         'd' => {
#           'e' => true
#         },

#         'f' => true
#       }
#     }
#   }
# }

# file_list(files) # => ['a/b/c/d/e', 'a/b/c/f']

# Solution
def file_list(hash)
  files = []

  hash.each do |item, nested_item|
    if nested_item.is_a?(Hash)
      folder = item
      nested_files = file_list(nested_item)
      nested_files.each { |file| files << "#{folder}/#{file}" }
    else
      files << item
    end
  end

  files
end

# The most difficult part of this problem is figuring out how to parse the file tree and what to return. We know that each call to file_list should return an array of files.

# When we iterate through the keys of our hash, our base case is that we find a key that points to true - this means we've found a file. We can add it directly into our results array. Otherwise, we know we need to make a recursive call to file_list. The recursive call will ultimately return an array of files. We can map over this list and add each item to our results array, making sure that we put the items into the results in the format "#{folder}/#{file}" so that we know how the results are nested.