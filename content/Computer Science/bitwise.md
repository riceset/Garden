---
tags:
  - 🌱
up: "[[C]]"
---
# Understanding Bitwise Operations

## Bitwise AND (&)

| A | B | A & B |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   0   |
| 1 | 0 |   0   |
| 1 | 1 |   1   |

### Main Use Case

- To check if a bit is set by comparing with a [[mask]]

Imagine we have an arbitrary number such as $3_{10}$ and suppose we want to know if the rightmost bit is $0_{2}$ or $1_{2}$. We might just do a bitwise $\text{AND}$ operation comparing $3_{10}$ to $1_{10}$ like the following:

$$
00000011_{2} \; \land \; 00000001_{2}
$$

We are considering 8 bits here, but for clarity, let's ignore all other irrelevant bits that are zero:

$$
11_{2} \; \land \; 01_{2}
$$

The evaluation of this expression begins with the rightmost bit. Therefore, in this case, the comparison of $1_{2}$ and $1_{2}$ yields a result of $1_{2}$. As outlined in the truth table for the $\text{AND}$ operation presented earlier, a result of $1_{2}$ is obtained only when both operands and the operator are $1_{2}$. Consequently, in this comparison, all other bits will result in $0_{2}$, given that we are comparing them with $1_{2}$

Consequently, to check the second rightmost bit, we would use the next power of 2 because $2_{10} = 10_{2}$,  $4_{10} = 100_{2}$ and so on...

## Bitwise OR (|)

| A | B | A \| B |
|---|---|--------|
| 0 | 0 |    0   |
| 0 | 1 |    1   |
| 1 | 0 |    1   |
| 1 | 1 |    1   |

### Main Use Case

- Setting a bit to a [[mask]]

This is quite similar to what we accomplished using the $\text{AND}$ operator. The primary distinction lies in the properties of the $\text{OR}$ operator, which, instead of checking, allows us to set a bit to 1.

So here let's suppose we have the number $10_{2}$ and want to set the third rightmost bit to 1 to obtain $110_{2}$:

$$
00000010_{2} \; \lor \; 00000100_{2}
$$

Ignoring all the irrelevant bits:

$$
010_{2} \; \lor \; 100_{2} \; = \; 110_{2}
$$

## Bitwise XOR (^)

| A | B | A ^ B |
|---|---|-------|
| 0 | 0 |   0   |
| 0 | 1 |   1   |
| 1 | 0 |   1   |
| 1 | 1 |   0   |

### Main Use Case

- To flip a bit to a [[mask]]

The main difference between using $\text{OR}$ and $\text{XOR}$ is that $\text{OR}$ is mainly used to set a bit to 1 and in contrast $\text{XOR}$ is used to flip a bit so $0_{2}$ becomes $1_{2}$ and $1_{2}$ becomes $0_{2}$.

Example:
$$
101_{2} \; \oplus \; 111_{2} \; = \; 010_{2}
$$

## Bitwise Left and Right Shift (<< / >>)

### Main Use Case

- Dynamic [[mask]] generation

The bitwise shift operator can be used to dynamically generate bit masks:

$$
1 \; \ll \; n$$
## Practical Example

Here, we are going to create a program that receives a number and prints its binary representation.

### Requirements

- Using the bitwise shift operator to dynamically generate masks
- Using the bitwise $\text{AND}$ operator to check if a bit is set

### Function Prototype

```c
void print_bits(unsigned char octet);
```

> [!note] Note
> The `unsigned char` data type is often used to represent a single byte, so it's also a possibility to `typedef` it to a type you might call `byte`.

### Algorithm

1. Loop through the byte 8 times
2. Prepare a bit mask set to $10000000_{2}$
4. Compare each bit with the bit mask using the bitwise $\text{AND}$ operator
5. Left shift the bit mask

```c
void print_bits(unsigned char octet)
{
  int i;
  int mask;

  mask = 0b10000000;

  i = 0;
  while (i < 8)
  {
    printf("%c", (octet & mask) ? '1' : '0');
    mask >>= 1;
    i++;
  }
}
```