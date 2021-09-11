import numpy as np
from scipy.fftpack import fft, ifft
from scipy.signal import ricker 

print ricker(10, 1.0)

x = np.array([1,-1,1,-1,1,-1,1,-1, 1, -1], dtype=float)
y = np.fft.fft(x)
print np.abs(y)

n = x.size
t = 1.0 / n 
freq = np.fft.fftfreq(n, d=t)
print freq
