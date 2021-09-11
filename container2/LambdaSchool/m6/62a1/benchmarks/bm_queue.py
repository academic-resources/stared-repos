import time
from ll_queue import LLQueue
from arr_queue import ArrQueue
​
n = 100000
​
llq = LLQueue()
arrq = ArrQueue()
​
start_time = time.time()
​
for i in range(n):
    llq.enqueue(i)
​
end_time = time.time()
​
print(f"LLQueue enqueue time: {end_time - start_time} seconds")
​
start_time = time.time()
​
for i in range(n):
    arrq.enqueue(i)
​
end_time = time.time()
​
print(f"ArrQueue enqueue time: {end_time - start_time} seconds")
​
start_time = time.time()
​
for i in range(n):
    llq.dequeue()
​
end_time = time.time()
​
print(f"LLQueue dequeue time: {end_time - start_time} seconds")
​
start_time = time.time()
​
for i in range(n):
    arrq.dequeue()
​
end_time = time.time()
​
print(f"ArrQueue dequeue time: {end_time - start_time} seconds")
Collapse
