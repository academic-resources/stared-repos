### Drivers

Special programs the OS runs that can talk to hardware that know the rules for specific hardware devices.

Need an operating system, or you would have to write every computer program starting with CPU language.

Operating systems began to emerge in the 50s/60s.

Multi-user system that can run multiple programs at once.

Operating system is the brains of your computer.

Microsoft Windows:
Bill Gates and friends made a pretty well-executed copy of an operating system that was hard to get and understand and sold it to everybody.

Two variants of PC operating systems that you'll see in people's hands:

There's a third operating system that is of great, great importance, called iOS that is not Windows or Linux.

If you're using a Mac for development, it's not Linux, but it's POSIX.

Reason Windows has slipped in popularity:
It was designed stupidly in the beginning (feature):
Easy to use and quick

Few principled technologies that OS provide:

## Process scheduling -

OS is the reason your system can run multiple programs at the same time.

"The Process Scheduler" swaps each program out on a schedule.

## BIOS - program that launches when your computer boots up:

- Firmware programs that aren't stored in your memory - stored on the motherboard and chips themselves
- Knows how to talk to your harddisk
- Knows how to talk to your graphics display
- Knows how to talk to your network card
- Reads the first sector on the harddisk (master boot record), which is the beginning of where your OS is
- Reads the first block of memory from your OS and loads it
- Will eventually find launchd

The youngest process ID is the oldest living system - the one that has to run everything else.

Two of the lowest level systems in the OS

- Can talk to the hardware
- Can do everything

### Launch daemon's jobs:

- Load new programs
- Run them
- Make them time-share
  (Because only one CPU and only one program can be run at a time)

### User agent:

- Controls what programs can be run
- Which memory the programs can access
- Enforces the rules of the system

Windows did not have a permissions model at all in the 80s/90s - loaded files into memory with no problem.

If you want to be a Windows programmer:

- You can make video games but it's thankless work with lots of hours and not much money.
- You can make medical tracking software for doctors.
- You can work for Microsoft themselves.
- You can work for the government.
- There's a lot of need for security, so always jobs for security

Worst thing about developing for Windows: when you want to write a new program, you have to give it compatability mode commands that go through all the other versions of Windows. So just building a basic program in Windows involves referencing the Windows 98, NT, ME, etc. sourcebases and configuring it to work in all those environments separately.

Compared to the Apple technique -> just to break your computer (there being a point where technology no longer works on older machines).

Linux based on UNIX -> ran on mainframes, faxes, building-sized systems, and was developed by academics in a closed environment to do everything an operating system should.

- A tree of files
  Files are able to communicate with processes using streams of text data

Programs can communicate with each other through files and streams of data side to side.

Windows communication is done mostly through the registry (a catastrophe).

C programming language is all about configuring your program before it gets compiled so it works on the plaform that you're trying to build it for.

If you don't have the same system, you do meta programming, build configuration, and you don't program in C until you work out the gimicks.

For doing cross platform C development, 80% of the work is platform compatability and 20% is writing the thing you want to share with people.

Question: Will we be doing things you can't do in Visual Studio?

Yes.

Biggest challenge of trying to use Visual Studio on Windows is that the system calls 'do not intersect' with the Linux system calls.

For 20 years, Windows has been trying to copy Linux's system calls.

Example, sockets didn't exist in Windows and they made a copy of BSD sockets called winsock that was marginally well implemented and has been the bane of tens of thousands of developers in that you can't write a program in C that talks to the Windows operating system and the Linux operating system.

You can meta program, you can manipulate the program so it writes a different program on Windows vs Ubuntu but will not write the same program.

Question: How does not building the hardware with the software affect Windows vs OSX?

It affects the quality of the experience.

Windows builds the operating system and then tells vendors (people who build hardware) how their hardware needs to work in order to work on Windows.
And then Windows has a multi-billion dollar certification lab for testing the hardware that people want to sell to make it Windows certified.
Because it's a free market, you don't have to get your Windows stuff certified.
You can make your driver, etc and release it to the public and sell it and it might work or might not work.

# Technology of your Operating System is all software

C Software
Assembly language
Binary wire commands

## What C is:

A high level programming langauge that converts human thought structures into assembly langauge.

## Assembly langauge:

The human representation of wire commands that go to the CPU

Below the assembly language it turns into the machine code that does go to the CPU

## When you boot the computer:

CPU does bit flipping
BIOS finds the harddrive, loads the master boot record from the harddrive

- That points to a file that is CPU executable instructions that will load everything else until the computer is up and running
- That file eventually runs a program called the kernel

### Kernel

- This file has very efficient algorithms for scheduling processes, loads them, schedules them, and keeps them safe from each other - doesn't allow them to delete each other's memory. Doesn't allow them to overwrite or cancel another program
- Provides commands for processes to talk to each other
  Provides a file management system called a file table and algorithms that contorl the creation of files, the discovery of files, and drivers.
- Runs specially privileged programs that are CPU level instructions out to new peripherals

When you run OSX, there's a block of drivers. Many written by Apple to control the harddrive, wifi, touchpad, etc.  
Each driver is a C program that knows the precise language of a specific piece of hardware.
When that driver program gets loaded by the kernel, it enables the CPU to handshake with that hardware and receive input/output from it

On Windows:
Package with 50,000 or 100,000 drivers, etc. 700 drivers for NVIDIA video cards. Drivers essentially become another program that the OS schedules.

# Processes, Scheduling, Memory Management, File System

## The function of the kernel:

Execute processes and schedule them
Manage their memory and the rest of the memory in the system
Provide access to and execute drivers that can control hardware
Create a file system for addressing long term storage and loading files such as drivers and executable processes from them.

Kernel is the core of the computer - alpha program

Kernel keeps a proces list inside of it.
It runs a closed loop:
Most basic operating technique in any computer is a loop that says while true.

Any long-lived program that you write tends to be inside of a while loop. Any program where the input and output are undefined and could be anything at any time.

That's what the kernel does.

Probably, it has a setup block before the while loop.

During setup, load the disk drivers so we can read the disk.
Then, create a memory map of all the memory in the system (what's available and what's been assigned to who).
Load the process scheduler program.
Load the memory manager
Load the user agent
Load the file table

Put the memory addresses for the memory management program into the list of the entire memory in the sytem - do that for user agent, file table, etc.

While true, load the next program

There's a list containing all of the processes that have been loaded.

Inside of the while loop, the OS comes online and says now that the basic systems have set up, execute them in turn

From the process list, pop the currently executed item.  
And it's probably not going to keep it as an stack, it'll have an array and a pointer at the index

Going to load at the index and execute it.

From the beginning:
BOOT -> Power on Self Test (POST)->BIOS-> MBR
-> Initial kernel

Operating system kernel-> kernel system processes->
load programs for:

- Process scheduling
- Memory management
- File table
- Drivers

## POST:

Firmware programs that check memory is present, there's a long-term storage available, and graphics are available

## BIOS:

Launches operating system from the boot record

## MSR

Master Boot Record

### Kernel system commands:

Read a file
Write a file
Allocate memory for a process
Destroy memory
Write data to a driver
Create a new process
Kill processes

[https://imgur.com/a/l3uLfiL]
