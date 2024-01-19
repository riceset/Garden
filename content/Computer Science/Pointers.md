---
title: Introduction to pointers in C
date: 2021-06-09
author: Komeno
cover: images/pointers.png
description: When we declare a variable in C, we generally do something like this...
tags:
  - C
---

When we declare a variable in C, we generally do something like this:
```c
int num = 1;
```

As you might know, variables get stored in memory, and the size of each variable will differ depending on its data type.

For instance, an integer variable like  `num` declared above is 4 bytes long on my Mac, but the size could vary depending on the machine.

You can always check the size of a particular data type by using the `sizeof()` operator.

```c
printf("%lu\n", sizeof(int));
```
output: 4

## The address-of operator (&)
The address-of operator is just an operator we place before some variable name to get that variable’s address in memory. We print this address using the `%p` format specifier to get the address in hexadecimal.
```c
int num = 1;
printf("%p", &num);
```
output: *0x7ffee7ea278c*

## The concept of a pointer
A pointer is just a variable that holds the address in memory of some other variable.

When declaring a pointer variable, we have to place a `*`  symbol just before the variable name.

```c
int *pointer;
```

Now that we declared our pointer variable let’s try assigning it the address of the variable `num`

```c
pointer = &num;
```

Now `pointer` will hold *0x7ffee7ea278c*, the address in memory of the variable `num`.

You can also declare a pointer variable and assign it a value at the same line.
```c
int *pointer = &num;
```

## Dereferencing a pointer
Dereferencing a pointer means accessing or manipulating data stored at an address in memory through a pointer variable.

Say we wanted to change the value of `num` from 1 (the value we initialized it with) to 2.
We could do something like this:

```c
num = 2;
```

But, what if we wanted to use the pointer we declared to change `num`’s value?
That’s when we use the *dereference operator* (*)

```c
*pointer = 2;
printf("%d\n", num);
```
output: 2

- - - -

## Use Example
Say we wanted to make a function that receives two numbers and swap them.
That would be kind of tricky to do because we can only return a single value from a function.
But with pointers, we can access some variable’s memory location and change it directly.

Consider the following example:

 We are declaring a function that receives two pointers and, we want to swap their values.

- First, we create a temporary variable and assign it the value pointed by `a`.

- Second, we dereference the pointer `a`  and set it to be equal to what `b` is pointing to. (That is, if `a` is pointing to a variable x containing 1 and `b` is pointing to a variable y containing 2 then, `a` would still be pointing to x but x would now contain 2.)

- Third, we set the value pointed by `b` to be equal to `temp`.

```c
void swap(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}
```

Now, we can call the swap function on main and see if it works.
```c
int main(int argc, char **argv)
{
    int x = 1;
    int y = 2;

    swap(&x, &y);

    printf("x: %i\ny: %i\n", x, y);
}
```
output:
x: 2
y: 1
