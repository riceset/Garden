# Access Specifiers in C++

## Public
Members declared as public can be accessed from anywhere outside the class.

```cpp
class Vehicle {
public:
	void accelerate(void) {
		std::cout << "Accelerating...!" << std::endl;
	}
};

int main(void) {
	Vehicle v1;
	v1.accelerate();
	return (0);
}
```

## Private
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

In the example above, `speed` is declared as a private member, so it cannot be accessed outside the `Vehicle` class. To **access** or **modify** its value externally, you would need to use member functions, commonly know as [[Getters and Setters]], which enhance code encapsulation. Also, you might have noticed that I used another `public` function with the same name as the class (`Vehicle` in this case). This function is called a [[Constructor]] in this case used to initialize the value of `speed` to 0.

## Protected
Members declared as protected cannot be accessed from outside the class but can be accessed from inherited classes (also known as subclasses, children classes)

```cpp
class Vehicle {
public:
	Vehicle() : speed(0) {}
protected:
	int speed;
};

class Car : public Vehicle {
public:
	void accelerate(int increase) {
		speed += increase;
	}
};
```

Here, we are modifying `Car`'s speed member that got inherited from the `Vehicle` class. To specify that a class was inherited from another class, we use the syntax `class CHILD_CLASS : INHERITANCE_ACCESS PARENT_CLASS {}`. In this example, the child class is `Car` that gets publicly inherited from `Vehicle`.

see: [[Inheritance Access]]
