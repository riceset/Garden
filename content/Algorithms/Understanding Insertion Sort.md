# Understanding Insertion Sort
Insertion sort is a straightforward yet inefficient sorting algorithm with a time complexity of $O(n^2)$. It works by treating the left portion of the array as already sorted, while the right portion remains unsorted. At each step, an element (referred to as the **key**) is taken from the unsorted portion and inserted into its correct position within the sorted section. The process begins by considering the first element already sorted, as it forms a one-element array. To insert the **key**, elements in the sorted section are shifted one position to the right until the key can be placed in its proper spot:

## Example
Here is the complete function for the algorithm:

```cpp
void insertion_sort(int *a, int n) {
	int key;
	int j;
	
	for (int i = 1; i < n; i++) {
		key = a[i];
		j = i - 1;
		while (j >= 0 && a[j] > key) {
			a[j + 1] = a[j];
			j = j - 1;
		}
		a[j + 1] = key;
	}
}
```

Where:
- `a` is the array
- `n` is the number of elements
- `key` is the selected element in the unsorted portion
- `j` is the index of the sorted portion

Consider the following array $A$ with 3 elements $(n = 3)$.
$$
A = [6, 5, 3]
$$
### Step by step
Consider the following `for` loop that is the main part of the algorithm:

```cpp
for (int i = 1; i < n; i++) {
	key = a[i];
	j = i - 1;
	while (j >= 0 && a[j] > key) {
		a[j + 1] = a[j];
		j--;
	}
	a[j + 1] = key;
}
```

---

#### First Iteration

Values:

```
key = 5
i = 1
j = 0
```

Indices:

```
[6, 5, 3]
 ^  ^
 j  i
```

1. In the nested loop, $0 \geq 0$ and $6 > 5$ so the loop is entered.

```cpp
while (j >= 0 && a[j] > key)
```

2. `a[j + 1]` which is 5 gets the value of `a[j]` which is 6.

```cpp
a[j + 1] = a[j];
```

Indices:

```
[6, 6, 3]
 ^  ^
 j  i
```

3. `j` gets decremented becoming `-1`.

```cpp
j--;
```

Values:

```
key = 5
i = 1
j = -1
```

4. The condition is checked again but now $j \ngeq 0$ so we break out of the loop.

```cpp
while (j >= 0 && a[j] > key)
```

5. `a[j + 1]` which is 6, the first element, gets replaced by the key which is 5.

```cpp
a[j + 1] = key;
```

Indices:

```
   [5, 6, 3]
 ^     ^
 j     i
```

---

#### Second Iteration

Values:

```
key = 3
i = 2
j = 1
```

Indices:

```
[5, 6, 3]
    ^  ^
    j  i
```

1. In the nested loop, $1 \geq 0$ and $6 > 5$ so the loop is entered.

```cpp
while (j >= 0 && a[j] > key)
```

2. `a[j + 1]` which is 3 gets the value of `a[j]` which is 6.

```cpp
a[j + 1] = a[j];
```

Indices:

```
[5, 6, 6]
    ^  ^
    j  i
```

3. `j` gets decremented becoming `0`.

```cpp
j--;
```

Values:

```
key = 3
i = 2
j = 0
```

Indices:

```
[5, 6, 6]
 ^     ^
 j     i
```

4. The condition is checked again $(j \geq 0)$ and it matches it as $(0 \geq 0)$.  `a[j]` which is 5 is also greater than the key which is 3.

```cpp
while (j >= 0 && a[j] > key)
```

5. `a[j + 1]` which is 6 gets the value of `a[j]` which is 5.

```cpp
a[j + 1] = a[j];
```

Indices:

```
[5, 5, 6]
 ^     ^
 j     i
```

6. `j` gets decremented becoming `-1`.

```cpp
j--
```

Indices:

```
   [5, 5, 6]
 ^        ^
 j        i
```

7. The condition is checked again but now $j \ngeq 0$ so we break out of the loop.

```cpp
while (j >= 0 && a[j] > key)
```

8. `a[j + 1]` which is 5, the first element, gets replaced by the key which is 3.

```cpp
a[j + 1] = key;
```

Indices:

```
   [3, 5, 6]
 ^        ^
 j        i
```

The array got sorted!

$$
A = [3, 5, 6]
$$
