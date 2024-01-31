---
title: Understanding the stack data structure
date: 2022-08-23
tags:
  - C
  - data_structures
---
# Understanding the stack data structure

![[stacks.jpg]]

**Stack** is an ADT (Abstract Data Structure) which follows the LIFO (Last In First Out) order. It might be easier to understand this concept by imagining an actual stack of books.

When working with stacks, you can use mainly two operations. `push()` to add an element to the top of a stack and `pop()` to literally pop out or remove an element of a stack. As it is considered an ADT (Abstract Data Structure) you can implement it in many ways with other basic data structures such as arrays or linked lists. Let’s try implementing it using an array first.

## Implementing push():

```c
void push(int element)
{
	stack[depth] = element;
	depth++;
}
```

in which, `element` is the value (an integer in this case) you want to put on the top of the stack and `depth` is the size of the stack. I defined the stack and the depth as global variables with the following default values:

```c
#define MAX_DEPTH 256
int stack[MAX_DEPTH];
int depth = 0;
```

You can also add some error handling such as returning when the stack’s depth has reached the `MAX_DEPTH`:

```c
void push(int element)
{
	if (depth == MAX_DEPTH)
		return ;
	stack[depth] = element;
	depth++;
}
```

## Implementing pop():

```c
int pop(void)
{
	depth--;
	return (stack[depth]);
}
```

Simple as that.

Like `push()`, you can also add some error handling to this function such as exiting out from the program when the stack is empty (in other words, when the depth is 0).

```c
int pop(void)
{
	if (depth == 0)
		exit(1);
	depth--;
	return (stack[depth]);
}
```

---

## Usage:

From the `main()` function, let’s try pushing some elements into our stack and then, printing the whole stack out.

```c
int main(void)
{
	push(1);
	push(2);
	push(3);

	for (int i = 0; i < 3; i++)
		printf("%d ", stack[i]);
	
	return (0);
}
```

***output:*** 3 2 1

***note:*** The output will be printed in reverse order.

You can also try popping out an element from the stack simply by calling ***pop()***.
