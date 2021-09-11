# notes on wavelets

use wavelets to discover frequency at given times;  wavelets are the windowing;  compare with discreet frequency windows perhaps, for more precision?

wavelets will help decipher amplitude changes, envelope detection;  

use fft to get major frequencies, and wavelets stretched to those wavelengths to detect ampltudes over time, which in turn will express rhythmic information

morphing overtone frequency amplitudes 


# notes on square waves

with regard to samplerate ```sr```, frequency ```f``` will switch ```f-1``` times every ```sr/2```;  additionally, a switch will occur every ```sr/f```

a frequency is encoded by flipping a bit every ceil(sr/f) - 1 % 2 

something about euclidian beats

where E(f,sr) where f is how many times the bit flips, and sr - f is how many bits it skips, at intervals floor(sr / f) plus split the mod over the intervals from the beginning

so E(5,16) yields 100100101010
5,16 1000100 100100 100 

the minimum required length length of a symetric signal is also ```sr/2```, because the second half of the signal is the inverse of the first.

unless higher frequencies are encoded into the signal;  this is possible to do;  indeed, writing privately known frequencies greater than the nihquist limit into a signal could be a form of encryption.  one could only detect them if one knows what they are; perhaps a range over a modulus would suffice for a large amount of data;  fundamentally this may just be a phase shift of frequencies below the nihquist limit...
