
# Print out all of the strings in the following array in alphabetical order, each on a separate line.
dances = ['Waltz', 'Tango', 'Viennese Waltz', 'Foxtrot',
    'Cha Cha', 'Samba', 'Rumba', 'Paso Doble', 'Jive']
'''
The expected output is:
'Cha Cha'
'Foxtrot'
'Jive'
'Paso Doble'
'Rumba'
'Samba'
'Tango'
'Viennese Waltz'
'Waltz'
'''
dances.sort()
print(dances)
for dance in dances:
    print(dance)
# Print out all of the strings in the following array in alphabetical order sorted by the middle letter of each string, each on a separate line.
# If the word has an even number of letters, choose the later letter, i.e. the one closer to the end of the string.


