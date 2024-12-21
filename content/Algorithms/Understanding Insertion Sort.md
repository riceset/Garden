# Understanding Insertion Sort
- An inneficient sorting algorithm with the time complexity of $O(n^2)$.
- It sorts the left portion of the array and leaves the right portion of the array unsorted.
- In each step, an element from the right portion is inserted in its correct position in the left.
- The first element is ignored as it is already a sorted array of 1 element.
- The selected element in the unsorted portion is called the **key**.
- When inserting the key, we shift the elements by one index to the left until the start of the array is reached or an element less than or equal to the key is found.

![image](https://github.com/user-attachments/assets/2c77b4a5-ad8d-4a7b-8b1a-bc34b63e5398)
## Example

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
Consider the following algorithm:

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

```
key = 5
i = 1
j = 0
```

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

```
[6, 6, 3]
 ^  ^
 j  i
```

3. `j` gets decremented becoming `-1`.

```cpp
j--;
```

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

```
   [5, 6, 3]
 ^     ^
 j     i
```

---

#### Second Iteration

```
key = 3
i = 2
j = 1
```

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

```
[5, 6, 6]
    ^  ^
    j  i
```

3. `j` gets decremented becoming `0`.

```cpp
j--;
```

```
key = 3
i = 2
j = 0
```

```
[5, 6, 6]
 ^     ^
 j     i
```

4. The condition is checked again $(j \geq 0)$ and it meets it as $(0 \geq 0)$.  `a[j]` which is 5 is also greater than the key which is 3.

```cpp
while (j >= 0 && a[j] > key)
```

5. `a[j + 1]` which is 6 gets the value of `a[j]` which is 5.

```cpp
a[j + 1] = a[j];
```

```
[5, 5, 6]
 ^     ^
 j     i
```

6. `j` gets decremented becoming `-1`.

```cpp
j--
```

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

```
   [3, 5, 6]
 ^        ^
 j        i
```

The array got sorted!

$$
A = [3, 5, 6]
$$
