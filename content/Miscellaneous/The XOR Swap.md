---
date: 02-05-2024
---

# The XOR Swap

The $\text{XOR}$ swap algorithm is a clever programming trick used to swap the values of two variables without using a third temporary variable. This method exploits the properties of the $\text{XOR}$ bitwise operation to perform the swap efficiently and in a mathematically elegant manner. The $\text{XOR}$, or "exclusive or," operation on two bits results in a value of 1 if and only if the bits are different; otherwise, the result is 0.

## Algorithm

The algorithm is described as follows:

$$
\begin{align*}

x_1 &= x_0 \oplus y_0 \\
y_1 &= x_1 \oplus y_0 \\
x_2 &= x_1 \oplus y_1

\end{align*}
$$
Expanding this:

$$
\begin{align*}

x_1 &= x_0 \oplus y_0 \\
y_1 &= (x_0 \oplus y_0) \oplus y_0 \\
x_2 &= (x_0 \oplus y_0) \oplus [(x_0 \oplus y_0) \oplus y_0]

\end{align*}
$$

When changing the order of operations:

$$
\begin{align*}

x_1 &= x_0 \oplus y_0 \\
y_1 &= (y_0 \oplus y_0) \oplus x_0 \\
x_2 &= (x_0 \oplus x_0) \oplus (y_0 \oplus y_0) \oplus y_0

\end{align*}
$$

Based on the $\text{XOR}$ properties, where we know that $x \oplus x = 0$ and that $x \oplus 0 = x$, $0 \oplus x = x$, we arrive at the following conclusions, completing the swap process:

$$
\begin{align*}

y_1 &= x_0 \\
x_2 &=  y_0

\end{align*}
$$

## Practical Example

Suppose we have two numbers we want to swap:

$$
\begin{align*}
x_0 = 101_2 \\
y_0 = 010_2
\end{align*}
$$

> [!info] Info
> Let $x_0$ and $y_0$ denote the initial values of variables $x$ and $y$, respectively. Here, the subscript $2$ indicates that the numbers are in base-2 (binary) notation.

Applying the XOR operation on these values:

$$
\begin{align*}
x_1 &= 101 \oplus 010 \\
x_1 &= 111
\end{align*}
$$

Continuing with the process:

$$
\begin{align*}
y_1 &= 111 \oplus 010 \\
y_1 &= 101
\end{align*}
$$

And finally:

$$
\begin{align*}
x_2 &= 111 \oplus 101 \\
x_2 &= 010
\end{align*}
$$

Thus, after applying the $\text{XOR}$ swap algorithm, $x_0$ (originally $101$) has been swapped with $y_0$ (originally $010$), demonstrating the algorithm's effectiveness with a practical example.
