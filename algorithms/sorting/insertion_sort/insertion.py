def insertion_sort(A):
    for j in range(1, len(A)):
        current = A[j]
        i = j - 1
        while i >= 0 and A[i] > current:
            A[i + 1] = A[i]
            i = i - 1
        A[i + 1] = current
