---
date: 2025-02-25
---

# NeoMnemo: My Submission for the 2025 Swift Student Challenge

In 2023, I got the chance to go to an event organized by the try! Swift Tokyo Student Club at Apple's headquarters in Tokyo. I met many students and developers from Japan's iOS community and learned about the yearly [try! Swift Tokyo](https://tryswift.jp/) event and the [Swift Student Challenge](https://developer.apple.com/swift-student-challenge/). The next year, I joined the try! Swift Tokyo for the first time. I listened to some great talks and talked with a few companies in Japan. I also made new friends who helped me learn more about the iOS community, and learned a lot from them.

This year, I decided to participate for the first time in the Swift Student Challenge with my new app **NeoMnemo**. In this article, I will be sharing some background on why I developed the app and how the developing process was for me.

## The App Concept and Idea

> **NeoMnemo** is a visual learning app that transforms stories used for memorization into vivid images, making complex concepts easier to understand and remember.

### Background

I’m currently a freshman at Tokyo University of Foreign Studies. As a Japanese Brazilian born and raised in Brazil, studying in Tokyo was a long-held goal of mine, but achieving it wasn’t easy. My education in Brazil didn’t include Japan-specific subjects like Japanese history and politics. Before taking the university entrance exam, I attended a preparatory course in Tokyo offered by the Japanese government, where I studied these topics, even though I found them challenging to understand. As the exam drew nearer, I knew I had to try something new. That’s when I decided to explore the use of mnemonics by creating short stories to connect key concepts.

### Bringing Mnemonics to Life through Image Generation

After watching last yearʼs WWDC, where the Image Playground was introduced, I immediately thought of integrating the Image Playground API into an app to create visual mnemonics as our brains tend to remember pictures better than words.

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/BEA8D4FA-97EB-4969-A127-3CA0ACEF6C33_2/oEilZlmId8ds2A4PGVCj4XXFWMNKIKais6oG3oyKYccz/Image.png)

### Branding and Design

The name “**NeoMnemo**” reflects a new approach to mnemonics by turning stories into images. The icon, designed with Freeform, Figma and Illustrator features a card displaying a Macaw, a bird renowned for its strong memory in the Brazilian Amazon. Its colorful feathers symbolize NeoMnemo's abilities to generate a diverse range of images. The card is encased in a bubble, emphasizing its integration with Image Playground.

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/06741CBA-CD0E-454D-8A2B-7FD00E869873_2/U1yguEW3lqvqWg7pj4bTm1nG3mXgWpBT98kaEiDFC38z/Image.png)

### User Experience

When users first open the app, they see a screen that explains NeoMnemoʼs core features. These include creating custom flashcards by pairing concepts with creative stories for smarter learning, generating visual mnemonics by transforming stories into vivid and memorable images, and learning with engaging visuals that make complex concepts easier to recall. This introduction was inspired by Appleʼs native apps, such as [Numbers](https://www.apple.com/in/numbers/), which highlight core features on the first launch.

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/ACB47677-BDB3-4F3B-822F-59A111314589_2/HGj1iiVkLcfnIEceSHfSsfEacfxbmO00AG9Ix3E3bTkz/Image.png)

After the introduction, users arrive at the main screen, which displays a flashcard grid featuring sample flashcards that showcase the variety of topics NeoMnemo can cover. In the card review section, I added smooth animations to create a more intuitive and enjoyable experience. Users can tap a card to flip it and reveal the answer, then swipe left or right to navigate through the deck. Once all cards have been reviewed, a congratulatory screen with a confetti effect appears, delivering positive reinforcement by celebrating progress and inspiring continued learning.

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/142744E8-ABB3-4EAA-B666-9B3D0C43DF2B_2/B2FNjlQf0Wbm2JyRdFIwvVrErxgQFGTouhD7yRtaby0z/Image.png)

For the add/edit card screen, I focused on input validation to ensure a seamless user experience. Each field includes placeholder text with sample content for the story, concept, and notes, guiding users on where to insert each element. As users type, labels update to indicate which fields are required or optional for generating an image and adding a card. I also implemented a word count limit in the story field, with a smooth animation updating the count as users type. This limit ensures that the Image Playground API can generate accurate images from the stories.

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/113A63A8-611A-464D-B19F-17396EEFE7EC_2/z7x8hYfew1ppvSVSL05rLQBv7oB7QA04MnzbNeDbu88z/Image.png)

## Development

On January 22, 2025, I began developing my app from scratch. This project marked my first time creating a full-fledged app using Apple's APIs and SwiftUI. Even though I had worked with SwiftUI in courses before, it was my first experience building an app entirely from the ground up. On day one, I envisioned the design for the view to add new cards, so I started by developing that component. While testing the Image Playground API, I discovered that it could be initialized via a sheet using the `imagePlaygroundSheet()` instance method.

Here is the prototype for this instance method:

```swift
@MainActor @preconcurrency
func imagePlaygroundSheet(
    isPresented: Binding<Bool>,
    concepts: [ImagePlaygroundConcept] = [],
    sourceImageURL: URL,
    onCompletion: @escaping (URL) -> Void,
    onCancellation: (() -> Void)? = nil
) -> some View
```

Here:

- `isPresented` is a boolean value which determines if the sheet is presented or not.
- `concepts` is an array of `ImagePlaygroundConcept`, a type which contains elements to include in the image sent to the Image Playground. In the case of **NeoMnemo**, it is the **Mnemonic Story** field.
- `sourceImageURL` wasn't used for this project but it represents the input image that can be sent to Image Playground so that it can use it as a base image to generate an image.
- `onCompletion` is the block that receives the URL for the image generated by the Image Playground in case of success.
- `onCancellation` is a block that we can specify an action in case the user exits the Image Playground without choosing an image. In my project, I opted for not using this block.

This is the code for generating a button that triggers the Image Playground:

```swift
Button("Generate Mnemonic Image", systemImage: "apple.intelligence") {
    isPresented = true
}
.imagePlaygroundSheet(isPresented: $isPresented, concepts: [concept]) { url in
            imageURL = url
}
```

Where the concept is a computed property which returns an Image Playground concept containing the contents of the **Mnemonic Story** text field:

```swift
private var concept: ImagePlaygroundConcept {
        ImagePlaygroundConcept.text(story)
}
```

The resulting initial views looked like this:

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/0ED3B7DE-14B7-43B5-924D-A1A6FEB4D055_2/62ESF2l1zFRst3UYgXHGHI55pGQodyCby0MgLAgZk2kz/Image.png)

### Managing Data

After that, I began considering how to store my app's data. I learned about [SwiftData](https://developer.apple.com/xcode/swiftdata/) and watched tutorial videos from Apple and other content creators. Thankfully, its usage was straightforward, and I was able to implement the model in a short period.

The first step is to mark your model with the `@Model` macro. Here is an example of the model for my app:

```swift
import SwiftData

@Model
class Mnemonic: Identifiable {
    var keyword: String
    var story: String
    var image: Data

    init(_ keyword: String, _ story: String, _ image: Data) {
        self.keyword = keyword
        self.story = story
        self.image = image
    }
}
```

Next, define the `modelContainer` inside the main app struct:

```swift
import SwiftUI

@main
struct MyApp: App {    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Mnemonic.self)
    }
}
```

Within `ContentView`, you can use the `@Query` macro to access the contents of the database and the `@Environment(\.modelContext)` property to modify its elements:

```swift
@Query private var mnemonics: [Mnemonic]
@Environment(\.modelContext) private var context
```

These properties allow you to perform various operations on the database, such as:

- Deleting an element:

```swift
context.delete(mnemonic)
try? context.save()
```

- Inserting an element:

```swift
context.insert(Mnemonic(keyword, story, imageData))
try? context.save()
```

For inserting images into the database, it is best to convert them to `Data` first. You can achieve this by using the `fetchData()` function and passing the image URL returned by the Image Playground:

```swift
if let url = imageURL {
    imageData = fetchData(from: url) ?? Data()
    context.insert(Mnemonic(keyword, story, imageData))
}
```

### The Card View

To test whether my data was stored correctly, I created a simple view that displays the retrieved elements, both images and text. I also experimented with a blurred background for the card's back, but eventually discarded that idea to keep the information clear and concise.

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/64FCA651-8D03-43DF-B4DF-2148C876D75F_2/Hi8MdsQ3wct3oJjgyuBtmVXqvDq7BbhfbCSHw6FzX6Uz/Image.png)

### Animating the Card

For giving the card a little bit of life and making it more intuitive to use, I used 3 animations:

#### The flip animation

I used `rotation3DEffect()` to flip the card 180° in the vertical axis when tapped:

```swift
content
    .rotation3DEffect(
        .degrees(isFlipped ? 180 : 0),
        axis: (x: 0, y: 1, z: 0)
    )
    .onTapGesture {
        withAnimation(.easeInOut(duration: 0.6)) {
            isFlipped.toggle()
        }
    }
```

#### The drag animation

I use the offset to slide the card horizontally, rotation to tilt it slightly, and a drag gesture so if you swipe far enough, it removes the card:

```swift
content
.rotationEffect(.degrees(offset.width / 5.0))
.offset(x: offset.width * 2)
.gesture(
    DragGesture()
        .onChanged { gesture in
            withAnimation(.easeOut(duration: 0.6)) {
                offset = gesture.translation
            }
        }
        .onEnded { _ in
            if abs(offset.width) > 100 {
                triggerHaptic.toggle()
                removal?()
            } else {
                offset = .zero
            }
        }
)
```

from: [Hacking with Swift](https://www.hackingwithswift.com/books/ios-swiftui/moving-views-with-draggesture-and-offset)

#### The Opacity animation

I use it to manage the text’s opacity in each card. If it’s on top, the text is fully visible, otherwise, it’s completely transparent. This effect prevents distractions when the user flips the top card and might briefly see the card underneath:

```swift
content
    .opacity(opacity)
    .onChange(of: isTopCard) { _, newValue in
        withAnimation(.easeInOut(duration: 0.3)) {
            opacity = newValue ? 1.0 : 0.0
        }
    }
    .onAppear {
        if isTopCard {
            opacity = 1.0
        }
    }
```

### The Card Grid

Then, I started working on the view for the card grid. I used a `LazyVStack` to position the cards in a grid format:

```swift
LazyVGrid(columns: gridColumns) {
    ForEach(mnemonics) { mnemonic in
        CardMiniatureView(mnemonic: mnemonic)
    }
}
```

I also included a new design for the button that triggers the view to add new cards and added actions to the card's context menu such as editing and deleting a card:

```swift
@ViewBuilder
private var contextMenuContent: some View {
    Button("Edit", systemImage: "pencil") {
        showEditSheet = true
    }
    Button(role: .destructive) {
        showDeleteConfirmation = true
    } label: {
            Label("Delete", systemImage: "trash")
    }
}
```

I applied this to the individual cards in the following way:

```swift
cardView
    .onTapGesture {
        isSheetPresented.toggle()
    }
    .fullScreenCover(isPresented: $isSheetPresented) {
        MnemonicSheet(mnemonic: mnemonic)
            .interactiveDismissDisabled()
    }
    .contentShape(ContentShapeKinds.contextMenuPreview, RoundedRectangle(cornerRadius: 16))
    .contextMenu {
        contextMenuContent
    }
    .alert("Are you sure you want to delete this mnemonic?", isPresented: $showDeleteConfirmation) {
        alertButtons
    }
    .sheet(isPresented: $showEditSheet) {
        CardFormView(card: mnemonic)
            .interactiveDismissDisabled()
    }
```

The resulting grid view looked like this:

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/6A9FA670-6C67-4652-9A65-57E81E522181_2/rLWHZlLoi5k9XFyzofbT71o7vj2vSGgBsSO21bsHgVMz/Image.png)

After that, I experimented with several card sizes and spacing to produce a symmetrical spacing and size to the cards. I also added a view for when the user has no mnemonic cards available:

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/AC60AF11-D47A-48BB-BC46-BA90330D9600_2/QgxzdgG1ROjZXfxp6eaQrZm9Qbc2ThCxaY8PRGq2ZXIz/Image.png)

### Landscape Card View

I also implemented a different design for when the card is displayed in landscape mode:

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/B0533A8B-8756-4A7A-9317-CB2CA56105E0_2/sEWhmCOvFxWf4ZUr1tCJpioXMDRZYHL6muUG8w0VxSMz/Image.png)

To identify landscape mode, I used `GeometryReader` to compare the screen's width and height:

```swift
var body: some View {
    GeometryReader { geometry in
        adaptiveLayout(isWide: isWideLayout(geometry))
    }
}

@ViewBuilder
private func adaptiveLayout(isWide: Bool) -> some View {
    if isWide {
        HStack {
            image
            content
        }
    } else {
        VStack {
            image
            content
            Spacer()
        }
    }
}

private func isWideLayout(_ geometry: GeometryProxy) -> Bool {
    geometry.size.width > geometry.size.height
}
```

The final version looked like this in landscape mode:

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/2A89C06E-CECD-4F93-9080-32AE1EAFE367_2/QvbNA8BQpjGnrbxCXeziRX6dsbVfqi6zkkAsmSycmNsz/Image.png)

and this in portrait mode:

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/85F56ECD-6A10-4C30-826E-DEB05A50401C_2/gjaTS2TXr2ZvPdw9gHsnTbkB0IxlYHuIWRq1nhVMIrkz/Image.png)

### Input Validation

I improved the add/edit card section by adding a “remaining words” feature. To accomplish this, I defined two computed properties:

```swift
private var wordCount: Int {
    story.split { $0.isWhitespace || $0.isNewline }.count
}
    
private var remainingWords: Int {
    max(47 - wordCount, 0)
}
```

Then, I added these properties into the header of the story text field section in my form:

```swift
Section(
    header: HStack {
        Text("Mnemonic Story")
        Spacer()
        Text("Remaining: \(remainingWords)")
            .foregroundColor(47 - wordCount < 0 ? .red : .gray)
    }
) {
   TextField(...)
}
```

I also introduced a transition to animate the numbers as they increase or decrease:

```swift
Text("Remaining: \(remainingWords)")
    .foregroundColor(47 - wordCount < 0 ? .red : .gray)
    .contentTransition(.numericText(countsDown: true))
    .transaction { transform in
        transform.animation = .default
    }
```

I also decided to change the labels as the user types. This helps guide them on what to enter for each field. Once they start typing, the labels switch to indicate which fields are required and which are optional:

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/FC1C031C-0252-487D-8A0B-490C19A134D0_2/s42SiJ75S9r8d2JJ59hXJCh02bBZscmAW8yhtiIBVdwz/Image.png)

### Building Adaptive Layouts

I created adaptive layouts for every iPad split-screen variation by applying padding to the card. After experimenting with multiple methods to ensure the card view adjusted properly to different screen sizes, I decided to measure the width and height of the view itself, whether in full-screen or split-screen using `GeometryReader` and comparing those values to the device’s full resolution. While this approach might not be the most elegant, it was a practical solution given the limited time for the project. I plan to improve the logic in the future.

```swift
card
    // iPad landscape fullscreen
    .padding(.vertical, isIpad() && width > height && width == screenWidth ? 120 : 0)
    .padding(.horizontal, width > height && width == screenWidth ? 40 : 0)
                
    // iPad landscape split
    .padding(.vertical, isIpad() && width > height && width < screenWidth ? 180 : 0)
                
    // iPad fullscreen portrait
    .padding(.horizontal, isIpad() && width < height && width == screenWidth ? 120 : 0)
    .padding(.vertical, isIpad() && width < height && width == screenWidth ? 80 : 0)
                
    // iPad non-fullscreen portrait ("little iPhone" view on landscape)
    .padding(.vertical, isIpad() && width < height && width != screenWidth && screenWidth / 2 - 5 != width ? 20 : 0)
    .padding(.horizontal, isIpad() && width < height && width != screenWidth && screenWidth / 2 - 5 != width ? 0 : 0)
                
    // iPad exact split
    .padding(.horizontal, isIpad() && width < height && screenWidth / 2 - 5 == width ? 80 : 0)
    .padding(.vertical, isIpad() && width < height && screenWidth / 2 - 5 == width ? 0 : 0)
                
    // iPhone
    .padding(24)
```

Here, `isIpad()` is defined as:

```swift
private func isIpad() -> Bool {
    UIDevice.current.userInterfaceIdiom == .pad
}
```

and `screenWidth` as:

```swift
let screenWidth = UIScreen.main.bounds.width
```

In landscape mode:

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/AF447569-FDA1-4513-B9C7-BD5DB4513B91_2/m4d6sq3nQcxtBEhg7xSoyTkVzXkx7FQ5KLogxPk8qTMz/Image.png)

In portrait mode:

![Image.png](https://res.craft.do/user/full/a56c5213-5c17-64c0-d902-b9958ea11cb4/doc/84DFABC9-3573-45AD-9C47-4F289B6AEB74/F2BBFDD7-1243-4D14-A6CE-2C23112BBD22_2/JLTvpNCZaPV0mHLniyuW0QjTLVJPOSjnhLrjsl4KUPcz/Image.png)

## Conclusion

Building **NeoMnemo** was an interesting experience for me. It pushed me to explore more SwiftUI, Apple's APIs, and rethink how app development works. As someone who has been writing C/C++ code for the last few years as part of my school curriculum, building an app was a truly rewarding experience. I also realized once more the power of visual mnemonics and how it can be applied to improve education, and I felt how fulfilling it was to craft an app that helps others study more effectively. I'm proud of the growth I've experienced while developing **NeoMnemo** and what I was able to accomplish in just one month. I plan on expanding its features and continuing to update the app, and I hope this article inspires you to experiment with your own creative ideas and share them with the world using Swift.
