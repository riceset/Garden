---
title: "My Swift Guide: Personal Reference for Swift Programming Concepts"
date: 2022-07-16
tags:
  - Swift
---

# My Swift Guide: Personal Reference for Swift Programming Concepts

![image](../media/swift-guide.png)

### Functions

```swift
func multiply(operand: Int, by: Int) -> Int {
	return operand * by
}

multiply(operand: 5, by: 6)
```

#### Using external and internal labels to improve readability

```swift
func multiply(_ operand1: Int, by operand2: Int) -> Int {
	return operand1 * operand2
}

multiply(5, by: 6)
```

#### Functions with function parameters

You can make a function receive another function as a parameter (similar to function pointers in C)

```swift
func doSomething(what: () -> Bool) {
	...
}
```

#### Functions as types

We can declare variables of type 'function' in Swift:

```swift
var foo: (Double) -> Double
```
### Structs and Classes

|              | Struct                  | Class                     |
| ------------ | ------------------------| ------------------------- |
| Passed by    | Value                   | Reference                 |
|              | Gets copied             | Passed via pointers       |
| Optimization | Copy on write           | Automatically reference counting |
|              | Only gets copied when you modify it | Swift keeps track of how many pointers are pointing to a piece of memory on the heap and when it goes to 0 it frees this memory |
| Paradigm     | Functional              | Object-oriented           |
| Inheritance  | No                      | Yes                       |
| Initialization | Free init for all variables | Free init (does not initialize variables) |
|    | Explicitly stated (var and let) | Always mutable        |


### Generics

These are data structures that we do not care about the type their values are (e.g. an array)

```swift
struct Array<Element> {
	func append(_ element: Element) { ... }
}
```

In which `Element` is a generic type.

#### Use

We define the array type on the declaration:

```swift
var a = Array<Int>()
```
