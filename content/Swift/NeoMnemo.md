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

![image](https://github.com/user-attachments/assets/5911fe22-c628-4999-b64e-91e19d3f14b1)

### Branding and Design

The name “**NeoMnemo**” reflects a new approach to mnemonics by turning stories into images. The icon, designed with Freeform, Figma and Illustrator features a card displaying a Macaw, a bird renowned for its strong memory in the Brazilian Amazon. Its colorful feathers symbolize NeoMnemo's abilities to generate a diverse range of images. The card is encased in a bubble, emphasizing its integration with Image Playground.

![image](https://github.com/user-attachments/assets/e6bfe258-66ed-4718-b1a7-105339b5a9fd)

### User Experience

When users first open the app, they see a screen that explains NeoMnemoʼs core features. These include creating custom flashcards by pairing concepts with creative stories for smarter learning, generating visual mnemonics by transforming stories into vivid and memorable images, and learning with engaging visuals that make complex concepts easier to recall. This introduction was inspired by Appleʼs native apps, such as [Numbers](https://www.apple.com/in/numbers/), which highlight core features on the first launch.

![image](https://github.com/user-attachments/assets/2e2af520-605d-4af7-87d7-f564af12d9a4)

After the introduction, users arrive at the main screen, which displays a flashcard grid featuring sample flashcards that showcase the variety of topics NeoMnemo can cover. In the card review section, I added smooth animations to create a more intuitive and enjoyable experience. Users can tap a card to flip it and reveal the answer, then swipe left or right to navigate through the deck. Once all cards have been reviewed, a congratulatory screen with a confetti effect appears, delivering positive reinforcement by celebrating progress and inspiring continued learning.

![image](https://github.com/user-attachments/assets/c4d6f6c8-2cd4-4ab7-ba70-ac81981fe955)

For the add/edit card screen, I focused on input validation to ensure a seamless user experience. Each field includes placeholder text with sample content for the story, concept, and notes, guiding users on where to insert each element. As users type, labels update to indicate which fields are required or optional for generating an image and adding a card. I also implemented a word count limit in the story field, with a smooth animation updating the count as users type. This limit ensures that the Image Playground API can generate accurate images from the stories.

![image](https://github.com/user-attachments/assets/d6634b9d-64ae-4a1f-a11f-33f5c482aeb3)

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

![image](https://github.com/user-attachments/assets/50a29a8e-12fe-4724-b216-ddfe42ffc8e2)

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

![image](https://github.com/user-attachments/assets/3c62789e-794e-4e2f-9744-e5d1a7a6d86e)

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

![image](https://github.com/user-attachments/assets/79c36715-9a0f-477d-a3e4-d33ce3d035cd)

After that, I experimented with several card sizes and spacing to produce a symmetrical spacing and size to the cards. I also added a view for when the user has no mnemonic cards available:

![image](https://github.com/user-attachments/assets/4c03455a-1e42-461b-a384-eee3df9f687c)

### Landscape Card View

I also implemented a different design for when the card is displayed in landscape mode:

![image](https://github.com/user-attachments/assets/51e298e3-126b-48b4-af07-048467095aad)

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

![image](https://github.com/user-attachments/assets/221b43c4-05ba-4895-9252-442939fd9c67)

and this in portrait mode:

![image](https://github.com/user-attachments/assets/ccd9ad41-bdbe-42ad-a79e-88d60c6f9075)

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

![image](https://github.com/user-attachments/assets/2cb67501-781c-4e6e-b9ed-b37b7ddadb0a)
![image](https://github.com/user-attachments/assets/db128d0f-a2f3-4059-b16b-97a6a87a6b86)

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

![image](https://github.com/user-attachments/assets/ae566dbd-38bf-44e2-8040-d96a8e1f6213)

![image](https://github.com/user-attachments/assets/90d68b6e-9438-410e-bdc1-c3ad81636a12)

![image](https://github.com/user-attachments/assets/0ae42c4e-e9b5-41ff-9d40-e0c06e10d0e2)

![image](https://github.com/user-attachments/assets/4c8b7ddb-7b4d-4a52-8d3d-11aadc1cbd4a)

In portrait mode:

![image](https://github.com/user-attachments/assets/88b41f24-cae6-4834-8445-517e7fcc3f9c)

## Conclusion

Building **NeoMnemo** was an interesting experience for me. It pushed me to explore more SwiftUI, Apple's APIs, and rethink how app development works. As someone who has been writing C/C++ code for the last few years as part of my school curriculum, building an app was a truly rewarding experience. I also realized once more the power of visual mnemonics and how it can be applied to improve education, and I felt how fulfilling it was to craft an app that helps others study more effectively. I'm proud of the growth I've experienced while developing **NeoMnemo** and what I was able to accomplish in just one month. I plan on expanding its features and continuing to update the app, and I hope this article inspires you to experiment with your own creative ideas and share them with the world using Swift.
