---
date: 2024-12-24
---
# Understanding Binary Insertion Sort
Binary Insertion Sort is a sorting algorithm that combines [[Insertion Sort]] with Binary Search for finding the location where an element should be inserted.

## Implementation

```cpp
void binaryInsertionSort(int arr[], int size)
{
	int key;
	int sortedIndex;
	int insertionIndex;

    for (int i = 1; i < size; i++)
    {
        key = arr[i];
        sortedIndex = i - 1;
        insertionIndex = binarySearch(arr, key, 0, sortedIndex);

        for (int j = sortedIndex; j >= insertionIndex; j--)
            arr[j + 1] = arr[j];

        arr[insertionIndex] = key;
    }
}
```

Where:
- `arr` is the array to be sorted
- `size` is the number of elements in the array
- `key` is the selected element in the unsorted portion of the array
- `sortedIndex` is the reverse index of the sorted portion of the array
- `insertionIndex` is the position to insert the `key` into the sorted portion of the array

### Binary Search Implementation
The different between the original binary search and the binary dearch used here is that its purpose is to find the correct position to insert the **key** value into the sorted array

```cpp
int binarySearch(int arr[], int key, int low, int high)
{
    if (high <= low)
        return (key > arr[low] ? low + 1 : low);

    int mid = (low + high) / 2;

    if (key == arr[mid])
        return (mid + 1);

    if (key > arr[mid])
        return (binarySearch(arr, key, mid + 1, high));

    return (binarySearch(arr, key, low, mid - 1));
}
```

where:
- `arr` is the sorted array in which to search
- `key` is the value to search for
- `low` is the lower bound index of the current search range
- `high` is the higher bound index of the current search range

Consider the following array $A$ with 3 elements $(n = 3)$:
$$
A = [6, 5, 3]
$$
### Step by step
Consider the following `for` loop that is the main part of the algorithm:

```cpp
for (int i = 1; i < size; i++)
{
	key = arr[i];
	sortedIndex = i - 1;
	insertionIndex = binarySearch(arr, key, 0, sortedIndex);

	for (int j = sortedIndex; j >= insertionIndex; j--)
		arr[j + 1] = arr[j];

	arr[insertionIndex] = key;
}
```

---
#### First Iteration

Values:

```
key = 5
i = 1
sortedIndex = 0
insertionIndex = ?
```

Those are the initial values for the first iteration. Now, to know where to insert the key into the sorted portion of the array, we need to call `binarySearch()`:

```cpp
for (int i = 1; i < size; i++)
{
	key = arr[i];
	sortedIndex = i - 1;
	> insertionIndex = binarySearch(arr, key, 0, sortedIndex);

	for (int j = sortedIndex; j >= insertionIndex; j--)
		arr[j + 1] = arr[j];

	arr[insertionIndex] = key;
}
```

##### Inside `binarySearch()`:

Values:

```
key = 5
low = 0
high = 0
```

As soon as we enter the function, the condition is met as $h \leq l$, so we enter the `return` statement. In this section the `key` gets compared with the first element of the array. As $5 \nleq 6$, `low` gets returned.

```cpp
if (high <= low)
	> return (key > arr[low] ? low + 1 : low);

int mid = (low + high) / 2;

if (key == arr[mid])
	return (mid + 1);

if (key > arr[mid])
	return (binarySearch(arr, key, mid + 1, high));

return (binarySearch(arr, key, low, mid - 1));
```

##### Back to `binaryInsertionSort()`:

Now, we got to know the value for the `insertionIndex`:

```
key = 5
i = 1
sortedIndex = 0
insertionIndex = 0
```

Back to the execution, we find a for loop that goes through the sorted portion of the array in reverse order:

```cpp
for (int i = 1; i < size; i++)
{
	key = arr[i];
	sortedIndex = i - 1;
	insertionIndex = binarySearch(arr, key, 0, sortedIndex);

	> for (int j = sortedIndex; j >= insertionIndex; j--)
		arr[j + 1] = arr[j];

	arr[insertionIndex] = key;
}
```

In the first iteration, `j` gets the value of 0 and as $0 \geq 0$, we enter the loop.
Then, the array's element at index 1 gets the value of the array's element at index 0.
$$
A = [6, 6, 3]
$$
In the second iteration, `j` gets decremented to -1, breaking out of the loop. After that, the key is inserted at the index 0 of the array:

```cpp
for (int i = 1; i < size; i++)
{
	key = arr[i];
	sortedIndex = i - 1;
	insertionIndex = binarySearch(arr, key, 0, sortedIndex);

	for (int j = sortedIndex; j >= insertionIndex; j--)
		arr[j + 1] = arr[j];

	> arr[insertionIndex] = key;
}
```

Result:
$$
A = [5, 6, 3]
$$
---
#### Second Iteration

Values:

```
key = 3
i = 2
sortedIndex = 1
insertionIndex = ?
```

Now, we are going to enter `binarySearch()` again to retrieve the index for inserting the `key`:
##### Inside `binarySearch()`:

Values:

```
key = 3
low = 0
high = 1
```

The condition base condition is false as $1 \nleq 0$ so we go to the next line:

```cpp
> if (high <= low)
	return (key > arr[low]) ? (low + 1) : low;

int mid = (low + high) / 2;

if (key == arr[mid])
	return (mid + 1);

if (key > arr[mid])
	return (binarySearch(arr, key, mid + 1, high));

return (binarySearch(arr, key, low, mid - 1));
```

The value for `mid` gets calculated resulting in 0:

```
key = 3
low = 0
high = 1
mid = 0
```

```cpp
if (high <= low)
	return (key > arr[low]) ? (low + 1) : low;

> int mid = (low + high) / 2;

if (key == arr[mid])
	return (mid + 1);

if (key > arr[mid])
	return (binarySearch(arr, key, mid + 1, high));

return (binarySearch(arr, key, low, mid - 1));
```

Then, we check if the `key` is equal to `arr[mid]`. As $3 \neq 5$, we skip this line:
$$
A = [5, 6, 3]
$$
```cpp
if (high <= low)
	return (key > arr[low]) ? (low + 1) : low;

int mid = (low + high) / 2;

> if (key == arr[mid])
	return (mid + 1);

if (key > arr[mid])
	return (binarySearch(arr, key, mid + 1, high));

return (binarySearch(arr, key, low, mid - 1));
```

After that, we check if the `key` is greater than the `arr[mid]`. As $3 \not> 5$m we go to the next line:

```cpp
if (high <= low)
	return (key > arr[low]) ? (low + 1) : low;

int mid = (low + high) / 2;

if (key == arr[mid])
	return (mid + 1);

if (key > arr[mid])
	return (binarySearch(arr, key, mid + 1, high));

> return (binarySearch(arr, key, low, mid - 1));
```

Here, we recursively enter `binarySearch()` with the following values:

```
key = 3
low = 0
high = -1
```

As $-1 \leq 0$, we enter the base case. Inside it, the `key` which is 3 gets compared with `arr[0]` which is 5, as $3 \not> 5$, the value for `low`, 0 gets returned.

```cpp
> if (high <= low)
	return (key > arr[low]) ? (low + 1) : low;

int mid = (low + high) / 2;

if (key == arr[mid])
	return (mid + 1);

if (key > arr[mid])
	return (binarySearch(arr, key, mid + 1, high));

return (binarySearch(arr, key, low, mid - 1));
```

##### Back to `binaryInsertionSort()`:

Now, we got to know the value for the `insertionIndex`:

```
key = 3
i = 2
sortedIndex = 1
insertionIndex = 0
```

Back to the execution, we find a for loop that goes through the sorted portion of the array in reverse order:

```cpp
for (int i = 1; i < size; i++)
{
	key = arr[i];
	sortedIndex = i - 1;
	insertionIndex = binarySearch(arr, key, 0, sortedIndex);

	> for (int j = sortedIndex; j >= insertionIndex; j--)
		arr[j + 1] = arr[j];

	arr[insertionIndex] = key;
}
```

In the first iteration, `j` gets the value of 1 and as $1 \geq 0$, we enter the loop.
Then, the array's element at index 2 gets the value of the array's element at index 1.
$$
A = [5, 6, 6]
$$
`j` gets decremented to 0 and the condition is checked again. It checks as true as $0 \geq 0$. Then, inside the loop, the array's second element gets the value of the array's first element.
$$
A = [5, 5, 6]
$$
`j` gets decremented to -1 and we break out of the loop as $-1 \ngeq 0$. After that, the key is inserted at the `insertionIndex` position in the array:

```cpp
for (int i = 1; i < size; i++)
{
	key = arr[i];
	sortedIndex = i - 1;
	insertionIndex = binarySearch(arr, key, 0, sortedIndex);

	for (int j = sortedIndex; j >= insertionIndex; j--)
		arr[j + 1] = arr[j];

	> arr[insertionIndex] = key;
}
```

Result:
$$
A = [3, 5, 6]
$$
