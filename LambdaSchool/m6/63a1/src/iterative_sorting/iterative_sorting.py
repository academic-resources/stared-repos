# TODO: Complete the selection_sort() function below

# os.chdir("E:\\projects\\LambdaSchool\\m6\\63a1\\src\\iterative_sorting\")
# exec(open("iterative_sorting.py").read())


def selection_sort(arr):
    '''
        procedure selection sort 
            arr         : array of items
            arraylength : size of arr

            for i = 1 to arraylength - 1:
                /* set current element as minimum*/
                smallest_index = i    
            
                /* check the element to be minimum */

                for j = i+1 to arraylength:
                    if arr[j] < arr[smallest_index]:
                        smallest_index = j;

                /* swap the minimum element with the current element*/
                if smallest_index != i:
                    swap arr[smallest_index] and arr[i]

        end procedure
    '''
    # loop through n-1 elements
    for i in range(0, len(arr) - 1):
        cur_index = i
        # set current element as minimum
        smallest_index = cur_index

        # check the element to be minimum
        for j in range(i+1, len(arr)):
            if arr[j] < arr[smallest_index]:
                smallest_index = j;

        # swap the minimum element with the current element
        if smallest_index != i:
            # swap arr[smallest_index] and arr[i]
            si_value = arr[smallest_index]
            i_value = arr[i]
            arr[smallest_index] = i_value
            arr[i] = si_value
            
    return arr

# TO-DO:  implement the Bubble Sort function below
def bubble_sort(arr):
    '''
        procedure bubbleSort( arr : array of items )
        length = arr.count;
        for i = 0 to length-1 do:
            swapped = false
            for j = 0 to length-1 do:
                /* compare the adjacent elements */
                if arr[j] > arr[j+1] then
                    /* swap them */
                    swap( arr[j], arr[j+1] )
                    swapped = true
            # if no number was swapped that means array is sorted now, break the loop.*/
            if(not swapped):
                break
        return arr
        end procedure 
    '''
    length = arr.count
    for i in range(0, len(arr) - 1):
        swapped = False
        for j in range(0, len(arr)-1):
            # compare the adjacent elements
            if arr[j] > arr[j+1]:
                # swap them
                # swap(arr[j], arr[j+1])
                j_value = arr[j]
                j1_value = arr[j+1]
                arr[j] = j1_value
                arr[j+1] = j_value
                swapped = True
        # if no number was swapped that means array is sorted now, break the loop.*/
        if swapped is False:
            break
    return arr

    '''
        procedure bubbleSort( list : array of items )
        loop = list.count;
        for i = 0 to loop-1 do:
            swapped = false
            for j = 0 to loop-1 do:
                /* compare the adjacent elements */
                if list[j] > list[j+1] then
                    /* swap them */
                    swap( list[j], list[j+1] )
                    swapped = true
                end if
            end for
            /*if no number was swapped that means
            array is sorted now, break the loop.*/
            if(not swapped) then
                break
            end if
        end for
        end procedure return list
    '''


# STRETCH: implement the Count Sort function below
def count_sort(arr, maximum=-1):
    if arr == []:
        return arr 
    # get maximum element from array
    maxElement = maximum
    for i in range(0, len(arr)-1):
        if arr[i] > maxElement:
            maxElement = arr[i]
        if arr[i] < 0:
            return "Error, negative numbers not allowed in Count Sort"

    arrOutput = [0] * (maxElement+1)
    # max = getMax(array, maximum)
    count = [0] * (maxElement+1) # create count array (max+1 number of elements)

    for i in range(0, (maxElement-1)):
        # initialize count array to all zero
        count[i] = 0

    for i in range(1, maximum):
        # increase number count in count array.
        count[arr[i]] += 1
        
    for i in range(1, maxElement - 1):
        # find cumulative frequency
        count[i] += count[i - 1]
        
    for i in range(len(arr)-1, -1, -1):
        if i >= 0:
            x = arr[i]
            y = count[x]
            arrOutput[x] = arr[i]
            if count[x] >= 1:
                # decrease count for same numbers
                count[x] -= 1

    arrDifference = int(len(arrOutput) - len(arr))

    for i in range((len(arrOutput) - 1), -1, -1):
        
        if int(arrOutput[i]) == int(0):
            del arrOutput[i]

    if int(len(arrOutput)) < int(len(arr)):
        arrOutput.insert(0, 0)

    return arrOutput







    '''
    Begin
        max = get maximum element from array.
        define count array of size [max+1]

        for i := 0 to max:
            count[i] = 0 # set all elements in the count array to 0
        done

        for i := 1 to size:
            increase count of each number which have found in the array
        done

        for i := 1 to max:
            count[i] = count[i] + count[i+1] # find cumulative frequency
        done

        for i := size to 1 decrease by 1 do
            store the number in the output array
            decrease count[i]
        done

        return the output array
    End
    '''

    return arr
