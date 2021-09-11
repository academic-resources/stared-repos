#rotation of an element by one step
def left_rotation(arr,d,n):
    for i in range(d):
        rotate_by_one_step(arr,n)



def rotate_by_one_step(arr,n):
    temp = arr[0]
    for i in range(n-1):
        arr[i] = arr[i+1]
    arr[n-1]=temp


def print_array(arr,n):
    for i in range(n):
        print(arr[i])

arr=[1,2,3,4,5]

left_rotation(arr,2,5)

print_array(arr,5)