---
tags:
  - 🌱
up: "[[École 42]]"
---
# 42 Exam Rank 2

## Solving repeat_alpha

### Overview

In this problem, we receive a string from the first command line argument and we have to look for alphabetic characters and print this certain character the number of times equivalent to its alphabetic index.

### Printing characters

We are not allowed to use `printf` here so let's create a function to be able to print one single character literal to stdout:

```c
void ft_putchar(int c)
{
	write(STDOUT_FILENO, &c, sizeof(char));
}
```

In this function, we are using the `write()` [[System Call]].

Arguments:
- The [[File Descriptor]] we want to write data into
- A pointer to the buffer you want to write the data from
- The amount of data you want to write.

> [!info] Why is the character declared an an integer?
> To accommodate a wider range of values than what a `char` can hold. Examples of that can be support for the extended ASCII or some Unicode characters or EOF handling that is usually defined as -1, a value that would not be available if we used the `char` type.

### Checking

This problem requires us to print a new line character when we can't display the correct output so I created a function for that:

```c
int failed(int error)
{
	ft_putchar('\n');
	return (error);
}
```

Now, in `main()` we can check the number of arguments passed to our program:

```c
if (argc != 2)
	return (failed(1));
```

### Main algorithm

1. Check for an alphabetic character
2. Differentiate between uppercase and lowercase characters
3. Subtract the alphabetic character from the alphabetic base and add 1
4. Loop through the string the equivalent number of times

Let's assign `argv[1]` that corresponds to the string we are going to be working with to a separate variable to make things clearer:

```c
char *str = argv[1];
```

### ASCII related functions

I separated the checking step into these 3 functions to be able to differentiate between uppercase and lowercase characters later on:

```c
int ft_isupper(int c)
{
	return ('A' <= c && c <= 'Z');
}
```

```c
int ft_islower(int c)
{
	return ('a' <= c && c <= 'z');
}
```

```c
int ft_isalpha(int c)
{
	return (ft_isupper(c) || ft_islower(c));
}
```

### The main loop

Here we are separating between alphabetic and non-alphabetic characters and calling `putalpha()` for printing the alphabetic ones:

```c
while (str[i] != '\0')
{
	if (ft_isalpha(str[i]))
		putalpha(str[i]);
	else
		ft_putchar(str[i]);
	i++;
}
```

### Getting the alphabetic base for each character

By alphabetic base here I am refering to 'A' in the case of an uppercase character and 'a' otherwise. As you can see these are different values in the ASCII table and using a different alphabetic base will lead to an unexpected result when converting values later on.

``` c
int get_base(int c)
{
	if (ft_islower(c))
		return ('a');

	if (ft_isupper(c))
		return ('A');

	return ('\0');
}
```

### Converting

Imagine we want to get the alphabetic index for the letter 'b', as it is a lowercase character we are going to subtract it from 'a' and add 1.

$$
C - B + 1
$$

where C = 66 and B = 65:

$$
66 - 65 + 1
$$

Resulting into 2 that is the number of times we want to print the letter 'b'.

Here is the code for doing that:

```c
int i;

i = c - base + 1;
while (i > 0)
{
	ft_putchar(c);
	i--;
}
```

### ASCII Table

| Character | Decimal Representation |
|-----------|------------------------|
| A         | 65                     |
| Z         | 90                     |
| a         | 97                     |
| z         | 122                    |

---

## Solving ft_strdup

### Prototype

```c
char *ft_strdup(const char *s1);
```

### Overview

`strdup()` is a simple function that returns a newly created buffer with the contents of the string that got passed to it.

### Algorithm

1. Count the string length
2. Malloc $l + 1$
3. Use `strcpy()` to copy the string to the buffer

### Implementation

```c
	char *buf;
	size_t len;

	len = ft_strlen(s1);
	buf = (char *)malloc((len + 1) * sizeof(char));
	if (buf == NULL)
		return (NULL);

	ft_strcpy(buf, s1);

	return (buf);

```

---

## Solving ft_atoi_base

### Algorithm

1. Skip whitespace

## Determining whitespace characters

```c
int ft_isspace(char c)
{
	return (c == ' ' || c == '\v' || c == '\t' ||
		       	c == '\r' || c == '\f' || c == '\n');
}
```

