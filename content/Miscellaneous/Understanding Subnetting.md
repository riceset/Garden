---
date: 24-06-2024
---

# Understanding Subnetting
Subnetting is the process of dividing a network into smaller subnetworks. This allows for efficient use of IP addresses and improves network security and management. Each subnet functions as an individual network.

## IP Address Format
An IPv4 address consists of a 32-bit number, divided into four octets. Each octet is represented by a decimal number ranging from 0 to 255, separated by dots. For example:

$$
192.168.1.1
$$

## Subnet Mask
A subnet mask is used to determine the network portion and the host portion of an IP address. The 1s in the subnet mask cover the network part, while the 0s cover the host part.

### Applying a Subnet Mask to an IP Address

1. Convert the IP address to binary:

$$
\begin{align}
192.168.000.001_{10} \\
= 11000000.10101000.00000000.00000001_2
\end{align}
$$

2. Convert the subnet mask to binary:

$$
\begin{align}
255.255.255.000_{10} \\
= 11111111.11111111.11111111.00000000_2
\end{align}
$$

3. Apply the AND operation to both:

$$
\begin{align}
11000000.10101000.00000000.00000001 \\
\& \ 11111111.11111111.11111111.00000000 \\
=11000000.10101000.00000000.00000000
\end{align}
$$

4. Convert the result back to decimal:

$$
\begin{align}
11000000.10101000.00000000.00000000_2 \\
=192.168.000.000_{10}
\end{align}
$$

## Calculating the Range of a Subnet Given an IP Address and a Subnet Mask

1. Given an arbitrary IP address such as:

$$
192.16.72.169
$$

2. Look at the subnet mask:

$$
255.255.255.240
$$

3. Determine the CIDR notation:

$$
11111111.11111111.11111111.11110000 = /28
$$

> [!info] Info
> The CIDR notation represents the subnet mask by the number of 1s it contains. For example, /28 indicates that 28 out of 32 bits are set to 1, representing the network portion.

4. Determine the number of bits for hosts:

$$
32 - 28 = 4
$$

> [!info] Info
> An IPv4 address consists of 32 bits. If the network portion occupies 28 bits, 4 bits are available for host addresses.

5. Determine the range of addresses:

$$
\begin{align}
0000_2 = 0_{10} \\
1111_2 = 15_{10}
\end{align}
$$

> [!info] Info
> With 4 bits for host addresses, the range is $0000 \le n \le 1111$ or $0 \le n \le 15$ in decimal.

6. Calculate the block number by dividing the last octet of the IP address by the range:

$$
\begin{align}
169 \div 16 = 10 \\
169 \mod 16 = 9
\end{align}
$$

> [!info] Info
> Dividing the last octet by the range indicates the network block. Here, the IP address is in the 10th block because $169 \div 16 = 10$.

7. Calculate the lowest number of the block:

$$
169 - 9 = 160
$$

8. Calculate the highest number of the block:

$$
160 + 15 = 175
$$

9. Determine the usable range (excluding the network and broadcast addresses):

$$
161 \leq n \leq 174
$$