% Butterworth lowpass filter based on the given specification
%Loading of Values
F_samp=44100;      % Sampling frequency (Hz)
F_pass=2500;       % Passband frequency (Hz)
F_stop=4000;       % Stopband frequency (Hz)
Rs= 55 ;           % Stopband ripple (dB)
Rp = 3;            % Passband ripple (dB)
load projIB.mat    % Noisy to be filtered

%Derived Parameter 
F_Nyg = F_samp/2;             % Nyguist frequency  (Hz)
wp= (pi*F_pass)/(F_Nyg*pi);   % Normalized Passband frequency
ws= (pi*F_stop)/(F_Nyg*pi);   % Normalized Stopband frequency

%Deteminign coefficients of the num and den of the H(s) 
[b, a]=butter(k, Wk);
[k, Wk]= buttord(wp,ws,Rp,Rs);

% Determining the Magnitude responses of the filter in dB and linear scale
[magnitud,z]=freqz(b,a,256); %freq response
Hbutter=abs(magnitud);
w=0:pi/255:pi;
Hbutter_dB=20*log10(Hbutter);

%Plot Noisy signal
figure(3)
subplot(211)
plot(noisy)
title('Original Signal with Noise')
ylabel('Amplitude')
xlabel(' t')
grid

%Filtering process with Butterworth filter
FilterdNoise=filter(b,a,noisy)*(20*log10(1000));%Amplifying the filtered signal by 60dB
subplot(212)
plot(FilterdNoise)
title('The Filtered Signal')
ylabel('Amplitude')
xlabel('t')
legend('Filtered Signal');
grid
aud=audioplayer(FilterdNoise,fs);    %Testing the noisy signal after filtering 
play(aud)

%Filter Visualization tool:Manitude and Phase Response
fvtool(b,a)
grid

%Magnitude Response in dB
subplot(311)
plot(w,Hbutter_dB,'LineWidth',3) %plot gain in dB
xlabel('Normalized Frequency')
ylabel('Magnitude (dB)')
title('Butterworth Lowpass Filter Magnitude (dB)')
grid

%Magnitude Response in Linear Scale
figure(1)
subplot(312)
plot(z/pi,Hbutter,'k', 'LineWidth',3)
xlabel('Normalized Frequency')
ylabel('Magnitude')
title('Butterworth Lowpass Filter Magnitude Response (linear scale)')
grid

%Plot the Group Delay 
g_delay=grpdelay(b,a,256);%The group delay of a filter is a measure of the average delay of the filter as a function of frequency
subplot(313)
plot(z/pi,g_delay,'y','LineWidth',3)
ylabel('Group delay (samples)');
xlabel('Normalized Frequency ')
title ('Butterworth Group Delay')
legend('Group delay');
grid

%Poles and Zeros
figure(2)
subplot(211)
zplane(b, a);
title('Poles and Zeros')
grid

%Plot the Impulse Response for first 100 samples
subplot(212)
imp=[1; zeros(49,1)]; 
imp_res=filter(b,a,imp);
stem(imp_res)
title('Impulse Response')
xlabel('Samples')
ylabel('Amplitude')
grid

