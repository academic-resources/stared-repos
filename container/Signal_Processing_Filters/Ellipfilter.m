% Design of Elliptic lowpass filter 
%Loading values

F_samp=44100;  % Sampling frequency (Hz)
Fp=2500;       % Passband frequency (Hz)
Fs=4000;       % Stopband frequency (Hz)
Rs= 55 ;       % Stopband ripple (dB)
Rp = 3;        % Passband ripple (dB)
load projIB.mat

F_Nyg = F_samp/2;              % Nyguist frequency  (Hz)
omega_p= (pi*Fp)/(F_Nyg*pi);   % Normalized Passband frequency
omega_s= (pi*Fs)/(F_Nyg*pi);   % Normalized Stopband frequency

%calculates the minimum order of a digital or analog elliptic filter 
[k, Wk]= ellipord(omega_p,omega_s,Rp,Rs);
[b, a]=ellip(k,Rp,Rs, Wk);

% Determining the Magnitude responses of the filte
[mag,z]=freqz(b,a,256);
Helliptic=abs(mag);
w=0:pi/255:pi;
Helliptic_dB=20*log10(Helliptic);

%Magnitude Response in dB
subplot(311)
plot(w,Helliptic_dB,'LineWidth',3)
xlabel('Normalized Frequency');
ylabel('Magnitude (dB)')
title('An Elliptic Lowpass Filter Magnitude (dB)')
legend('Mag Response')
grid

%Magnitude Response in Linear Scale 
subplot(312)
plot(z/pi,Helliptic,'k', 'LineWidth',3)
xlabel('Normalized Frequency');
ylabel('Magnitude')
title('An Elliptic Lowpass Filter Magnitude Response (linear scale)')
legend('Normalized Frequency')
grid

%Plot the group Delay 
g_delay=grpdelay(b,a,256);
subplot(313)
plot(z/pi,g_delay,'y','LineWidth',3)
ylabel('Group delay (samples)');
xlabel('Normalized Frequency ')
title ('Elliptic Filter Group Delay')
legend('Group Delay')
grid

%Poles and Zeros
figure(2)
subplot(211)
zplane(b, a);
title('The Elliptic Filter Poles and Zeros')

%Plot the Impulse Response for first 50 samples
subplot(212)
imp=[1; zeros(49,1)];
impulse_res=filter(b,a,imp);
stem(impulse_res)
grid
title('Elliptic Filter Impulse Response')
xlabel('Sample')
ylabel('Amplitude')

%Filtering with the Elliptic Filter
figure(3)
subplot(211)
plot(noisy)
title('Original Signal')
ylabel('Amplitude')
xlabel(' sample')


%Filtering process with the Elliptic filter
FilterdNoise=filter(b,a,noisy)*(20*log10(1000));%Amplifying the filtered signal by 60dB
subplot(212)
plot(FilterdNoise)
title('The Filtered Signal')
ylabel('Amplitude')
xlabel('t')
legend('Filtered Signal');
fvtool(b,a)
grid
aud=audioplayer(FilterdNoise,fs);    %Testing the noisy signal after filtering 
play(aud)

