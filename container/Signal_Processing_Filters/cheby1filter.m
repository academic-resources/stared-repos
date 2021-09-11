% Design of Chebyshev Type I lowpass filter based on the given specifications
%Loading Values
F_samp=44100;      % Sampling frequency (Hz)
Fp=2000;           % Passband frequency (Hz)
Fs=4000;           % Stopband frequency (Hz)
Rs = 55;           % Stopband ripple (dB)
Rp = 3;            % Passband ripple (dB)
load projIB.mat    % load Noisy from file

%Derived Parameter 
F_Nyg = F_samp/2;         % Nyguist frequency
wp= (pi*Fp)/(F_Nyg*pi);   % Normalized Passband frequency
ws= (pi*Fs)/(F_Nyg*pi);   % Normalized Stopband frequency

% The order of the filter k is estimated using
[k, Wk]= cheb1ord(wp,ws,Rp,Rs);
[b, a]=cheby1(k,Rp, Wk);

% Determining the Magnitude responses of the filter in dB and linear scale
[magni,z]=freqz(b,a,256);
Hcheby1=abs(magni);
w=0:pi/255:pi;
Hcheby1_dB=20*log10(Hcheby1);

%Magnitude Response in dB
subplot(311)
plot(w,Hcheby1_dB,'LineWidth',2)
xlabel('Normalized Frequency');
ylabel('Magnitude (dB)')
title('Lowpass Filter Magnitude (dB)')
legend('Filter Magnitude')
grid

%Magnitude Response in Linear Scale 
subplot(312)
plot(z/pi,Hcheby1,'k', 'LineWidth',3)
xlabel('Normalized Frequency');
ylabel('Magnitude')
title('Lowpass Filter Magnitude Response (linear scale)')
legend('Magnitude Response')
grid

%Plot the group Delay 
g_delay=grpdelay(b,a,256);
subplot(313)
plot(z/pi,g_delay,'y','LineWidth',3)
ylabel('Group delay');
xlabel('Normalized Frequency ')
title('Group Delay')
legend('Group Delay')
grid

%Poles and Zeros 
figure(2)
subplot(211)
zplane(b, a);
title('Poles and Zeros')
legend('Poles and Zeros')
grid

%Plot the Impulse Response for first 50 samples 
subplot(212)
imp=[1; zeros(49,1)];
impulse_res=filter(b,a,imp);
stem(impulse_res)
title('Impulse Response')
xlabel('Sample')
ylabel('Amplitude')
legend('Impulse Response')
grid

%Filtering with the Chebyshev Type I 
figure(3)
subplot(211)
plot(noisy)
title('Original Signal')
ylabel('Amplitude')
xlabel('t')
grid

%Filtering process with the Chebyshev Type I
s=filter(b,a,noisy)*(20*log10(1000)); %amplification of the signal
subplot(212)
plot(s)
title('Filtered Signal')
ylabel('Amplitude')
xlabel('t')
fvtool(b,a)
grid
aud=audioplayer(s,fs); %Testing the noisy signal after filtering
play(aud)
