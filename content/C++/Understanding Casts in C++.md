---
date: 2024-09-07
---

# Understanding Casts in C++

## Implicit Conversion (Coersion)
When the conversion is done **implicitly** by the compiler.

```cpp
int x = 7;
int y = 3;

float res = x / y;
```

## Explicit Conversion
When the conversion is done **explicitly** by the programmer.

## Types of Cast
### Static Cast
• **What it is**: A cast similar to implicit conversion (coercion), but done explicitly by the programmer.

• **When to use**: Use `static_cast` when you want to perform safe conversions, like from one numeric type to another (e.g., `double` to `int`), and you’re sure the types are compatible.

• **Why it works**: It performs the conversion at compile-time but **does not check** at runtime if the cast is valid.

```cpp
double m = 2.1 * 3.5;
int res = static_cast<int>(m);
```

### Upcasting and Downcasting
First Consider these 2 classes where `player` is inherited from `entity`:

 ```cpp
Entity *entity = new Entity;
Player *player = new Player;
```

### Upcasting
• **What it is**: Casting a derived class pointer to a base class pointer.

• **Why it’s safe**: Every Player is also an Entity, so this cast is safe.

```cpp
Entity *ep = player;
```

### Downcasting
• **What it is**: Casting a base class pointer to a derived class pointer.

• **Why it’s dangerous**: Not every Entity is a Player, so this cast can be unsafe.

```cpp
Player *pp = entity;
```

### Dynamic Cast
• **What it is**: A cast used when downcasting. It checks at runtime if the cast is valid.

• **When to use**: You use `dynamic_cast` when you’re not sure whether the object you’re pointing to is actually of the derived type.

• **Why virtual functions?**: For `dynamic_cast` to work, the base class must have at least one virtual function. This is because the virtual function creates something called a **vtable** (a table of virtual functions), which stores information about the actual type of the object. This information helps `dynamic_cast` check if the object is really of the derived type at runtime.

```cpp
Player *pp = dynamic_cast<Player>(entity);
```

### Reinterpret Cast
• **What it is**: A cast used to convert one pointer type to another pointer type without checking compatibility.

• **When to use**: Use `reinterpret_cast` when you want to treat the memory address of one object as if it were a different type, even though the types may be unrelated.

• **Why it works**: It simply **reinterprets** the memory address, but does not ensure the types are compatible.

```cpp
class Apple {
public:
    int x = 10;
};

struct Banana {
    int y;
};
```

```cpp
Apple* apple = new Apple();
Banana* banana = reinterpret_cast<Banana*>(apple);

banana->y = 20;
```
