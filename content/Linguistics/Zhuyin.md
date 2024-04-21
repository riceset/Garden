---
title: Journey into Zhuyin: The Taiwanese alphabet
date: 2023-12-18
tags:
  - anki
  - mandarin
---
# Journey into Zhuyin: The Taiwanese alphabet

I've always been fascinated by Chinese characters, particularly the traditional ones used in Taiwanese Mandarin. This led me to study Zhuyin, the phonetic system utilized in Taiwan not only to represent sounds and tones but also to input of Chinese characters on computers.

When learning specific character sets like Zhuyin or Cyrillic, I prefer to learn how to read them in the context of whole words, rather than individual characters. This approach makes it easier to memorize them since, in the real world, we deal with words rather than isolated characters. The same principle applies to vocabulary learning. It’s not very effective to learn isolated words without understanding the context in which they're used. So, when learning new words, it’s crucial to learn them within a phrase.

## How I got started
The first thing I did was create an [Anki](https://en.wikipedia.org/wiki/Anki_(software)) deck with bidirectional cards. For each word, there is one card displaying the Chinese character on the front and its Zhuyin reading on the back, and another card with the reverse configuration.

First card:

| Front | Back    |
| ----- | ------- |
| 朋友    | ㄆㄥˊ ㄧㄡˇ |

Second card:

| Front   | Back |
| ------- | ---- |
| ㄆㄥˊ ㄧㄡˇ | 朋友   |
## Vocabulary
I got all the sample vocabulary from this [YouTube video](https://www.youtube.com/watch?v=AKH5IHhbUUA) from Grace. This proved to be one of the best resources I found, as she employs simple, familiar words which makes the learning process more effective.

## Note type
Anki's note types consist of two HTML files (one for the front and one for the back of the card) along with a CSS file. To improve the appearance and modernize our cards, we can use a template named **[prettify](https://github.com/pranavdeshai/anki-prettify)**.

Naturally, we can to make templates suit our individual preferences, such as opting for centered text or incorporating additional buttons. I have done exactly that, and you can access my customized template on my GitHub repository, named [NeoMnemo](https://github.com/riceset/NeoMnemo) (access it from the `mandarin` branch!)

## Audio and tone syntax highlight
[Chinese Support](https://ankiweb.net/shared/info/1752008591) is an exceptional plugin which automatically adds Zhuyin/Pinyin readings and audio to your cards:

![[Linguistics/media/ezgif-6-3547f632c0.gif]]

## Fonts
In order to use Chinese fonts like *SimSun* (新宋), *SongTi* (宋体), and *KaiTi* (楷体) on your iPhone, follow these steps:

1. Find a font file with the `.ttf` extension. e.g. `SongTi.ttf`

2. Rename the font file by adding an underscore before the font name and keeping the `.ttf` extension. For instance, rename `SongTi.ttf` to `_songti.ttf`.

3. Move the renamed font file to Anki's media folder. On MacOS, you can usually find this folder at `~/Library/Application\ Support/
Anki2/user/collection.media`, where 'user' is your profile name in Anki.

4. Now, you need to load the font into your note type's CSS, typically located at the bottom of the CSS file. Use the following syntax:

```css
@font-face {
  font-family: songti;
  src: url('_songti.ttf');
}
```

Where `songti` will be the name you will use to stylize the cards on your CSS file.
