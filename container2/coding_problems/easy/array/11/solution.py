def isValidSubsequence(array, sequence):
	i = 0
	for num in sequence:
		found = False
		while (i < len(array) and not found):
			if array[i] == num:
				found = True
			i += 1
		if not found:
			return False
	return True
