---
title: Understanding signals in Linux
date: 2022-08-12
tags:
  - C
  - linux
---

# Understanding signals in Linux

![[signals.jpg]]

## What is a process ID?

A process ID a.k.a. ***PID*** is literally what the name says, it is a number to uniquely identify a running process. You can print your program’s ***PID*** in C using the ***getpid()*** function included on the header file ***unistd.h***.

```c
int main(void)
{
	while (1)
	{
		printf("PID: %d\n", getpid());
		sleep(1);
	}
}
```

***output: “*** PID: 12345 ”

***note:*** “12345” is a PID for an arbitrary process.

## What is a signal?

A signal is a one-way message to inform that something important happened sent by a process to a process, the kernel to the process, or a process to itself. Some examples of signals are ***SIGINT*** and ***SIGSTOP*** mapped to “ctrl-C” and “ctrl-Z” respectively on **Unix-like Operating Systems.**

## Sending signals:

You can send a signal with the command ***kill*** through the command line specifying as the first parameter the signal you want to send, and as the second parameter the PID of the process you want to send it to.

```bash
kill -INT 12345
```

or in C (don’t forget to include the header file ***signal.h***):

```c
kill(12345, SIGINT);
```

---

## Handling signals:

You can use the ***signal()*** function in C to handle a specific signal defined as the first parameter in the ***signal()*** function call, and pass the address of a function you would like to run when the specified signal is received.

```c
signal(SIGINT, &sigint_handler);
```

Now, I will define the ***sigint_handler()*** function as:

```c
void sigint_handler(int signal_number)
{
	printf("sigint's signal number is %d\n", signal_number);
}
```

The function above will be run when ***SIGINT*** (when the user presses ***ctrl-C*** or uses the kill program/function to send a signal) is sent. It will simply print the signal number for ***SIGINT*** based

 on the table shown on the manual page for ***signal***. To see it, just run:

```bash
man signal
```

By the way, there are some pre-existing functions that you can pass to ***signal()*** such as ***SIG_IGN*** (to ignore a signal) and ***SIG_DFL*** (for default handling of a certain signal).

Usage:

```c
signal(SIGINT, SIG_IGN);
```
