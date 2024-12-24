---
date: 2024-08-15
---

# Understanding the Orthodox Canonical Class Form

The **Orthodox Canonical Form** in C++ involves defining 5 special member functions for a class.

1. Default Constructor
2. Parameterized Constructor
3. Copy Constructor
4. Assignment Operator
5. Destructor

Considering the following `Human` class, let’s talk about each of these member functions.

```cpp
class Human {
private:
    std::string _name;
    int         _age;
public:
    const std::string &getName() const {
        return (_name);
    }
    int getAge() const {
        return (_age);
    }
};
```

### Default Constructor

The **Default Constructor** is a special member function in a class that initializes an object with **default values** during the object’s instantiation.

```cpp
class Human {
private:
    ...
public:
    Human() : _name("Default Name"), _age(0) {
        std::cout << "Human Default Constructor Called!" << std::endl;
    }
    ...
};
```

Usage:

```cpp
int main(void) {
    Human h1;
    std::cout << h1.getName() << std::endl;
      std::cout << h1.getAge() << std::endl;
    return (0);
}
```

### Parameterized Constructor

The **Parameterized Constructor** initializes an object with **specific values** provided as arguments during the object’s instantiation.

```cpp
class Human {
private:
    ...
public:
    Human(const std::string &name, int age) : _name(name), _age(age) {
        std::cout << "Human Parameterized Constructor Called!" << std::endl;
    }
    ...
};
```

Usage:

```cpp
int main(void) {
    Human h1("Mark", 42);
    std::cout << h1.getName() << std::endl;
    std::cout << h1.getAge() << std::endl;
    return (0);
}
```

### Copy Constructor

The **Copy Constructor** initializes a new object as a copy of an existing object. This is useful when passing an object by value or when we need to duplicate an object.

```cpp
class Human {
private:
    ...
public:
    Human(const Human &other) : _name(other._name), _age(other._age) {
        std::cout << "Human Copy Constructor Called!" << std::endl;
    }
    ...
};
```

Usage:

```cpp
int main(void) {
    Human h1("Mark", 42);
    Human h2(h1);
    std::cout << h2.getName() << std::endl;
    std::cout << h2.getAge() << std::endl;
    return (0);
}
```

### Assignment Operator

The **Assignment Operator** assigns the value of one object to another already-existing object. Here, we need to handle deep copying and self-assignment.

```cpp
class Human {
private:
    ...
public:
    Human &operator=(const Human &other) {
        if (this != &other) {
            _name = other._name;
            _age = other._age;
        }
        std::cout << "Human Assignment Operator Called!" << std::endl;
      
        return (*this); //Required for chaining
    }
    ...
};
```

Note: `this` is a pointer of type `Human *` which points to the current object. Dereferencing it gives us access to the current object. If the assign operator gets called like this `h2 = h1` then, `h1` refers to `other` and `h2` refer to `this` in this case.

Usage:

```cpp
int main() {
    Human h1("Mark", 42);
    Human h2("John", 30);

    h2 = h1;

    std::cout << h2.getName() << std::endl;
    std::cout << h2.getAge() << std::endl;

    return (0);
}
```

### Destructor

The **Destructor** is called when an object goes out of scope or is explicitly deleted. It is used to clean up resources such as memory or file handles.

```cpp
class Human {
private:
    ...
public:
    Human(const std::string& name, int age) : _age(age) {
        _name = new std::string(name);  // Dynamic Memory Allocation
    }

    ~Human() {
        std::cout << "Human Destructor Called!" << std::endl;
        delete _name;  // Clean Up
    }
    ...
};
```
