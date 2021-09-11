
# complete the helper function below to merge 2 sorted arrays 
def merge(arrA, arrB):
    '''
    procedure merge( var arrA as array, var arrB as array )
        var merged_arr as array
        while ( arrA and arrB have elements )
            if ( arrA[0] > arrB[0] )
                add arrB[0] to the end of merged_arr
                remove arrB[0] from arrB
            else
                add arrA[0] to the end of merged_arr
                remove arrA[0] from arrA
    end while

    while ( arrA has elements )
            add arrA[0] to the end of merged_arr
            remove arrA[0] from arrA
    end while  

    while ( arrB has elements )
            add arrB[0] to the end of merged_arr
            remove arrB[0] from arrB
    end while   

    return merged_arr

    end procedure
    '''
    elements = len(arrA) + len(arrB)
    merged_arr = [] * elements
    
    x, y = 0, 0

    while x < len(arrA) and y < len(arrB):
            if arrA[x] > arrB[y]:
                # add arrB[0] to the end of merged_arr
                merged_arr.append(arrB[y])
                y+=1
            else:
                # add arrA[0] to the end of merged_arr
                merged_arr.append(arrA[x])
                x+=1
            
    merged_arr += arrA[x:]
    merged_arr += arrB[y:]

    return merged_arr


# implement the Merge Sort function below USING RECURSION
def merge_sort(arr):

    '''
    procedure mergesort( var a as array )
        if ( n == 1 ) return a
        l1 as array = a[0] ... a[n/2]
        l2 as array = a[n/2+1] ... a[n]
        l1 = mergesort( l1 )
        l2 = mergesort( l2 )
        return merge( l1, l2 )
    end procedure
    '''
    if len(arr) <=1:
        return arr
    l1 = merge_sort(arr[:int(len(arr) / 2)])
    l2 = merge_sort(arr[int(len(arr) / 2):])

    arr_final = merge(l1, l2)
    return arr_final


# implement an in-place merge sort algorithm
def merge_in_place(arr, startpoint, midpoint, endpoint):
    '''
    procedure merge( var arrA as array, var arrB as array )
        var merged_arr as array
        while ( arrA and arrB have elements )
            if ( arrA[0] > arrB[0] )
                add arrB[0] to the end of merged_arr
                remove arrB[0] from arrB
            else
                add arrA[0] to the end of merged_arr
                remove arrA[0] from arrA
    end while

    while ( arrA has elements )
            add arrA[0] to the end of merged_arr
            remove arrA[0] from arrA
    end while  

    while ( arrB has elements )
            add arrB[0] to the end of merged_arr
            remove arrB[0] from arrB
    end while   

    return merged_arr

    end procedure
    '''
    midplusone = midpoint + 1

    if (arr[midplusone] >= arr[midpoint]):
        return

    while (startpoint <= midpoint and endpoint >= midplusone):

        if (arr[startpoint] <= arr[midplusone]):
            startpoint += 1
        else:
            current_upper_mid_value = arr[midplusone]
            current_upper_mid_index = midplusone

            while (startpoint != current_upper_mid_index):
                arr[current_upper_mid_index] = arr[current_upper_mid_index - 1]
                current_upper_mid_index -= 1

            arr[startpoint] = current_upper_mid_value

            startpoint += 1
            midpoint += 1
            midplusone += 1

    return arr

def merge_sort_in_place(arr, leftpoint, rightpoint):
    '''
    procedure mergesort( var a as array )
        if ( n == 1 ) return a
        l1 as array = a[0] ... a[n/2]
        l2 as array = a[n/2+1] ... a[n]
        l1 = mergesort( l1 )
        l2 = mergesort( l2 )
        return merge( l1, l2 )
    end procedure
    '''
    if (rightpoint > leftpoint):

        midpoint = leftpoint + (rightpoint - leftpoint) // 2

        merge_sort_in_place(arr, leftpoint, midpoint)
        merge_sort_in_place(arr, midpoint + 1, rightpoint)

        merge_in_place(arr, leftpoint, midpoint, rightpoint)

    return arr


# STRETCH: implement the Timsort function below
# hint: check out https://github.com/python/cpython/blob/master/Objects/listsort.txt
def timsort(arr):
    # Your code here

    return arr

'''
We consider size of run as 32.
We one by one sort pieces of size equal to run using Insertion Sort.
After sorting individual pieces, we merge them one by one using merge sort. We double the size of merged subarrays after every iteration.
'''
