---
title: Understanding MVVM in SwiftUI (Stanford CS193p)
date: 2023-12-19
tags:
  - SwiftUI
  - Swift
  - design_patterns
---
# Understanding MVVM in SwiftUI (Stanford CS193p)

![[mvvm.png]]

MVVM is a design paradigm that stands for *Model-View-ViewModel*.

### Model

- It is completely UI independent (simple swift files)
- Contains the **data** + **logic**

### View

- Is **stateless** because it is a reflection of the current state of the model
- Declarative (the view is determinjed by what `body` returns)

### ViewModel

- Binds the View to the Model so that changes in the model cause the view to get rebuilt
- Example: gets data from a SQL database and puts it into an array
- It constantly looks for changes in the model and publishes 'to everyone' that something has changed
- Can modify the model

## Applying MVVM in Memorize

### Model

Now let's return to coding Memorize. We are going to define our model for this memory game as the following struct:

```swift
struct MemoryGame<CardContent> {
    var cards: Array<Card>
    
    struct Card {
        var isFaceUp: Bool = false
        var isMatched: Bool = false
        var content: CardContent
    }
}
```

Here we are declaring an array of cards and defining the `Card` type below as a struct. The content of the `Card` is going to be a generic and we have to specify what variable type we want it to be when using the `MemoryGame` struct (just like when using an array e.g. `Array<Int>`)

We are also setting a default value for `isFaceUp` and `isMatched` for the `Card` struct so we don't have to set it every time.

Now we can create an initializer for this model. It gets the number of pairs of cards 
as a parameter and creates cards for us.

```swift
init(numberOfPairsOfCards: Int) {
	cards = Array<Card>()
	
}
```

Observation: When we create our own initializer we are going to have to initialize all variables being used inside the struct by ourselves.

Now let's create a `for` loop to add cards to our array:

```swift
for pairIndex in 0..<numberOfPairsOfCards {
	cards.append(content: ???)
}
```

here we are using pairIndex (something like `i` in C) and looping numberOfPairsOfCards times where on each iteration we are appending a newly created card to our `cards` array.

The problem here is that we don't have our content yet. To solve this let's create a function called `createCardContent()` that receives `pairIndex` and returns `CardContent`:

```swift
for pairIndex in 0..<numberOfPairsOfCards {
	cards.append(content: createCardContent(pairIndex))
}
```

Passing this function as a parameter in the initializer:

```swift
init(numberOfPairsOfCards: Int, createCardContent: (Int) -> CardContent)
```

### ViewModel

The ViewModel is defined as a class:

```swift
class EmojiMemoryGame {
	private var model = MemoryGame<String>(numberOfPairsOfCards: 4,
	 createCardContent: { (index: Int) -> String in
		return "👻"
	})
}
```

here we can use our model defining it as a private variable (making it only accessible from this class). Then we assign it to a `MemoryGame` instance and set `CardContent` type to a string. Then initialize it with 4 pairs of cards and pass a function to create the contents of the cards.
k
As Swift already knows the types for the input and output for this function because it was specified in the model we can simplify this function removing the types for the input and output and even remove the `return` statement and parenthesis:

```swift
private var model = MemoryGame<String>(numberOfPairsOfCards: 4,
	createCardContent: { index in "👻" })
```

As `createCardContent` is the last parameter we can simplify it like this:

```swift
private var model = MemoryGame<String>(numberOfPairsOfCards: 4) {
	index in "👻"
}
```

Since we are not using the `index` variable we can omit it too:

```swift
private var model = MemoryGame<String>(numberOfPairsOfCards: 4) {
	_ in "👻"
}
```

#### Using static

Let's try to insert the emojis array into our ViewModel:

```swift
let emojis: [String] = ["🚗", "🚕", "🚙", "🚌"]
```

Now let's assign an emoji indexed from this array to the contents of our card:

```swift
private var model = MemoryGame<String>(numberOfPairsOfCards: 4) {
	pairIndex in emojis[pairIndex]
}
```

But we cannot initialize a property (e.g. let, var) with a value that depends on another property because the order of initialization of properties is random.

To solve this we can use an initializer to explicitly set the order of initialization of our properties, make the `emojis` constant global or as a better option we can make it `static`:

```swift
static let emojis: [String] = ["🚗", "🚕", "🚙", "🚌"]
```

Using type variables (e.g. `static var`, `static let`) and type functions (`static func`) makes them 'global' to all instances of this class. So in contrast to a normal variable that would get created on each instance, a type variable or type function will be created only once and referenced from other instances.
