F_samp=44100;      % Sampling frequency (Hz)
Fp=2500;           % Passband frequency (Hz)
Fs=4000;           % Stopband frequency (Hz)
Rs= 55;             % Stopband ripple (dB)
Rp = 3;             % Passband ripple (dB)
F_Nyg = F_samp/2;         % Nyguist frequency  (Hz)
wp= (pi*Fp)/(F_Nyg*pi);   % Normalized Passband frequency
ws= (pi*Fs)/(F_Nyg*pi);   % Normalized Stopband frequency
[k, Wk]= cheb2ord(wp ,ws ,Rp ,Rs);
[b, a]=cheby2(k,Rs, Wk);

% Determining the Magnitude responses of the filter in dB and linear scale
[mag,z]=freqz(b,a,256);
Hcheby2=abs(mag);
w=0:pi/255:pi;
Hcheby2_dB=20*log10(Hcheby2);
%fvtool(b,a)
%Magnitude Response in dB 
subplot(311)
plot(w,Hcheby2_dB,'LineWidth',2)
xlabel('Normalized Frequency');
ylabel('Magnitude (dB)')
title('Chebyshev Type II Lowpass Filter Magnitude (dB)')
grid

%Magnitude Response in Linear Scale
subplot(312)
plot(z/pi,Hcheby2,'k', 'LineWidth',3)
xlabel('Normalized Frequency');
ylabel('Magnitude')
title('Chebyshev Type II Lowpass Filter Mag Res (linear scale)')
legend('Magnitude Response')
grid

%Plot the group Delay
g_delay=grpdelay(b,a,256);
subplot(313)
plot(z/pi,g_delay,'y','LineWidth',3)
ylabel('Group delay (samples)');
xlabel('Normalized Frequency ')
title ('Chebyshev Type II Group Delay')
grid

%Poles and Zeros 
figure(2)
subplot(211)
zplane(b, a);
title('Poles and Zeros')
legend('Poles and Zeros')

%Plot the Impulse Response for first 50 samples
subplot(212)
imp=[1; zeros(49,1)];
impulse_res=filter(b,a,imp);
stem(impulse_res)
title('Chebyshev Type II Impulse Response')
xlabel('Sample')
ylabel('Amplitude')
legend('Impulse Response')
grid

%Filtering with the Chebyshev Type II
figure(3)
subplot(211)
plot(noisy)
title('Original Signal')
ylabel('Amplitude')
xlabel(' sample')
grid

%Filtering process with the Chebyshev Type II
s=filter(b,a,noisy)*(20*log10(1000)); %amplification of the signal to be audible
subplot(212)
plot(s)
title('Filtered Signal')
ylabel('Amplitude')
xlabel('sample')
grid
aud=audioplayer(s,fs);%Testing the noisy signal after filtering
play(aud)
