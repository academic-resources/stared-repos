"""
Created on Sun Aug 21 16:59:18 2016

@author: Claudio Bellei

--------------------
DYNAMIC TIME WARPING
--------------------

Input: ts1, ts2 (timeseries)
Output: cost (distance between the warped time series)

options:
1. plot. If True, plots a few figures.
2. test. If True, uses test data.

"""

import numpy as np
import matplotlib.pyplot as plt

def dtw(ts1=[],ts2=[],plot=False,test=False):
    """
    :type ts1: float - timeseries1
    :type ts2: float - timeseries2
    :type plot: logical - True if plotting
    :type test: logical - True if this is a test
    """
    if test:
        ts1 = np.cos(2*np.pi*(3*np.arange(1,1001,dtype=float)/1000)**2)
        ts2 = np.cos(2*np.pi*9*np.arange(1,400,dtype=float)/400)
        
    if plot:
        plt.plot(ts1)
        plt.plot(ts2)
        plt.show()        

    m = len(ts1)
    n = len(ts2)
    DTW = np.zeros((n,m),dtype=float)

 #   for i in range(1,n):
 #       DTW[i, 0] = 2**32
 #   for i in range(1,m):
 #       DTW[0, i] = 2**32
 #   DTW[0,0] = 0

    #first row
    for i in range(1,m):
        DTW[0,i] = distance(ts1[i],ts2[0]) + DTW[0,i-1]
    #first column
    for i in range(1,n):
        DTW[i,0] = distance(ts1[0],ts2[i]) + DTW[i-1,0]

    for i in range(1,n):
        for j in range(1,m):
            cost = distance(ts1[j],ts2[i])
            DTW[i,j] = cost + np.min([DTW[i-1,j],  \
                                        DTW[i,j-1],  \
                                        DTW[i-1,j-1]])

    if plot:
        plt.figure()
        plt.imshow(DTW,origin='lower',interpolation='none',aspect='auto')
        plt.clim([DTW[0,0],10.*DTW[n-1,m-1]])
        plt.xlabel('ts1')
        plt.ylabel('ts2')
        plt.title('DTW')
        plt.colorbar()
        plt.show()

    #now find best path, going backwards
    path = dict()
    path[0] = (n-1,m-1,DTW[n-1,m-1])
    c = 0
    finished = False
    i = n-1
    j = m-1
    while (not finished):
        v = np.array([DTW[i-1,j],DTW[i-1,j-1],DTW[i,j-1]])
        cost = np.min(v)
        k = np.where(v==cost)[0][0]
        if k==0:
            path[c] = (i-1,j,cost)
            i = i-1
        elif k==1:
            path[c] = (i-1,j-1,cost)
            j = j-1
            i = i-1
        else:
            path[c] = (i,j-1,cost)
            j = j-1
        if path[c][0]==0 and path[c][1]==0:
            finished = True
        c += 1

    path_i = np.array([])
    path_j = np.array([])
    cost = np.array([])
    for k in path.keys():
        path_i = np.append(path_i, path[k][0])
        path_j = np.append(path_j,path[k][1])
        cost = np.append(cost, path[k][2])

    if plot:
        plt.plot(path_j,path_i)
        plt.show()

        plt.plot(ts1)
        plt.plot(ts2)
        for i in range(len(path.keys())):
            plt.plot([path_j[i],path_i[i]],[ts1[path_j[i]],ts2[path_i[i]]],'k')
        plt.show()

    #print path_i
    #print path_j

    path_j = np.asarray(path_j,dtype=int)
    path_i = np.asarray(path_i,dtype=int)

    if plot:
        plt.plot(ts1)
        plt.plot(ts2)
        #maps ts2 on warped time domain
        plt.plot(path_j,ts2[path_i],'o')
        plt.show()

    return np.sum(cost)

def distance(p1,p2):
    return (p1-p2)**2