# Understanding Object-Oriented Programming in C++

If you have coded in C before, you might have heard of structs. Those are user defined data types to encapsulate related data into a new data type.

```c
struct Person {
	char *name;
	int age;
};

typedef struct Person Person;
```

> [!notes]
> In C, simply writing `struct Person` will not create a new type called `Person` but instead, a type called `struct Person`. Most programmers use a `typedef` to create an alias from `struct Person` to `Person`.

This defines a new data type called Person that encapsulates two related data: a name and an age. By grouping these properties into a struct, we establish a clear relationship between them, which wouldn't be as apparent if they were simply declared as independent variables:

```c
char *name;
int age;
```

The problem with using structs in C is that we can just connect and relate data and not actions. This is where Object-Orientation comes into play.

In the example I gave you using structs in C, after writing the struct, we can instantiate it and access its members like this:

```c
int main(void) {
	Person john;

	john.name = "John";
	john.age = 30;
}
```

> [!notes]
> Here, for simplicity purposes I am making `john.name` point to a string literal and not allocating memory for it.

## Understand classes
This is the equivalent code for the struct above using a class:

```cpp
#include <iostream>

class Person {
	std::string name;
	int age;
};
```

If we try to instantiate it and access its members you will notice it is not possible. This is because all members are created as `private` by default.

```cpp
int main(void) {
	Person john;
	john.name = "John"; //Error
}
```

## Access Specifiers
In C++ classes, we have 3 kinds of access specifiers. `public`, `private` and `protected`. Let's talk about each of them:

### Public
Members declared as public can be accessed from anywhere outside the class.

```cpp
class Vehicle {
public:
	void accelerate() {
		std::cout << "Accelerating...!" << std::endl;
	}
};

int main(void) {
	Vehicle v1;
	v1.accelerate();
	return (0);
}
```

### Private
Private members can only be accessed within the class itself.

```cpp
class Vehicle {
public:
	Vehicle() : speed(0) {}

	void accelerate(int increase) {
		speed += increase;
	}
private:
	int speed;
};

int main(void) {
	Vehicle v1;
	v1.accelerate(10);
	return (0);
}
```

### Protected
Members declared as protected cannot be accessed from outside the class but can be accessed from inherited classes (also known as subclasses, children classes, derived classes) more on that later.

```cpp
class Vehicle {
private:
    int speed;
protected:
    int getSpeed() const {
    return (speed);
    }
public:
    Vehicle() : speed(0) {}
};

class Car : public Vehicle {
public:
    void accelerate(int increase) {
        if (increase > 0) {
            int currentSpeed = getSpeed();
            currentSpeed += increase;
        }
    }
};
```

## Constructors
You might have noticed the following line in the classes discussed earlier:

```cpp
Vehicle() : speed(0) {}
```

This is how we define constructors in C++.  Essentially, this syntax ensures that when an instance of `Vehicle` is created, its member variable `speed` is initialized to 0. If we want to allow the initialization of `speed` with a specific value at the time of object creation, we could define the constructor like this:

```cpp
Vehicle(int initialSpeed) : speed(initialSpeed) {}
```

This constructor allows the speed of a new `Vehicle` object to be set to any specified integer value provided at the time of instantiation.

## Getters and Setters
As mentioned earlier, we typically declare member variables as `private` to encapsulate and protect them. How, then, can we access and modify these private values? The answer is by using getters and setters. A getter method is designed to retrieve the value of a private member, while a setter method is used to update the value of a member with a new one.

```cpp
class Person {
public:
	Person(const std::string& initialName) : name(initialName) {}

	std::string getName() const {
		return (name);
	}

	void setName(const std::string& newName) {
		name = newName;
	}
private:
	std::string name;
}
```

### Constructor
In the constructor, we pass a constant reference and initialize the member `name` to `initialName`. Using a reference avoids the costly operation of copying the entire string or struct, which can be expensive. Additionally, specifying it as `const` ensures the value remains unmodified within the method.

### Getter
Here, the `const` keyword is used to indicate that this method will not modify any member as this method is only used to retrieve values.

### Setter
Here the constant reference is used in a similar way to the constructor.

## Inheritance
When talking about `protected` we saw the following example:

```cpp
class Vehicle {
private:
    int speed;
protected:
    int getSpeed() const {
    return (speed);
    }
public:
    Vehicle() : speed(0) {}
};

class Car : public Vehicle {
public:
    void accelerate(int increase) {
        if (increase > 0) {
            int currentSpeed = getSpeed();
            currentSpeed += increase;
        }
    }
};
```

Inheritance is a fundamental concept of Object-Oriented Programming (OOP) that establishes a hierarchy between a base class and its derived classes. In this structure, both public and protected members of the base class are inherited by the derived class. Public members continue to be accessible as public, while protected members also remain protected in the derived classes. This setup allows derived classes to access inherited protected members directly within their scope. However, private members, while inherited, are not accessible directly; they can only be accessed through methods provided by the base class, such as getters or setters.

## Polymorphism
Polymorphism is a concept that allows objects from different classes to be treated as objects of a common superclass.

### Virtual functions
These are functions that are implemented in the base class but can be overridden in derived classes.

```cpp
class Animal {
public:
	//Generic implementation of speak()
    virtual void speak() {
        std::cout << "..." << std::endl;
    }
    virtual ~Animal() {} //destructor
};

class Dog : public Animal {
public:
    void speak() override {
        std::cout << "Bark!" << std::endl;
    }
};

class Cat : public Animal {
public:
    void speak() override {
        std::cout << "Meow!" << std::endl;
    }
};
```

### Pure virtual functions
These are functions that are declared but not implemented in the base class, and they require an implementation in derived classes. This declaration makes the base class abstract.

```cpp
class Animal {
public:
	// '= 0' makes it a virtual function
    virtual void speak() = 0;

    virtual ~Animal() {} //destructor
};

class Dog : public Animal {
public:
    void speak() override {
        std::cout << "Bark!" << std::endl;
    }
};

class Cat : public Animal {
public:
    void speak() override {
        std::cout << "Meow!" << std::endl;
    }
};
```

### Usage
Here, we are dynamically allocating an instance of `Dog()` using the `new` keyword which is analogous to `malloc()` in C, and freeing the memory with `delete` similar to `free()` in C:

```cpp
int main(void) {
    Animal* myAnimal = new Dog();
    myAnimal->speak();
    delete myAnimal;

    myAnimal = new Cat();
    myAnimal->speak();
    delete myAnimal;

    return (0);
}
```

### Destructors
In the example provided, you might have noticed that we use a base class pointer (`Animal*`) to point to instances of derived classes (`Dog` and `Cat`). When these objects are deleted using `delete`, it is crucial to have a virtual destructor in the base class (`Animal`). This virtual destructor ensures that the destructor of the derived class is called first, followed by the destructor of the base class. This sequence properly frees all resources associated with the object, including those allocated in the derived class as well as any in the base class.

```cpp
virtual ~Animal() {}
```
