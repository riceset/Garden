---
title: Mastering Mandarin with Anki
date: 2023-12-18
author: Komeno
cover: images/anki-chinese.png
description: Mandarin Chinese (普通话) has always fascinated me and learning it has been a long-standing aspiration of mine. In this article, I'll introduce you to several tools I use alongside Anki to create visually appealing flashcards for Mandarin Chinese.
tags:
  - Mandarin
  - Anki
---
Mandarin Chinese (普通话) has always fascinated me and learning it has been a long-standing aspiration of mine. In this article, I'll introduce you to several tools I use alongside Anki to create visually appealing flashcards for Mandarin Chinese.

### Anki

Anki is an open-source flashcard program that uses spaced repetition, a learning technique that increases intervals of time between reviews of previously learned material.

### Pretiffy

Anki's note types consist of two HTML files (one for the front and one for the back of the card) along with a CSS file. To enhance the appearance and modernize our cards, we can utilize a template named **[prettify](https://github.com/pranavdeshai/anki-prettify)**.

Naturally, we have the freedom to make templates suit our individual preferences, such as opting for centered text or incorporating additional buttons. I have done exactly that, and you can access my customized template on my GitHub repository, named [NeoMnemo](https://github.com/riceset/NeoMnemo) (access it from the `mandarin` branch!)

![Image1](https://github.com/riceset/riceset.com/assets/48802655/eb6d220e-07f1-474b-a35a-3f8b907ebc9a)

###  Pinyin

After experimenting with numerous plugins for adding pinyin to Chinese characters, the one I ultimately chose was [Pinyin on top of Hanzi](https://ankiweb.net/shared/info/417709332). This plugin generates pinyin readings and places them within HTML ruby tags, resulting in a visually stunning result.

![Image2](https://github.com/riceset/riceset.com/assets/48802655/a62f049f-e84b-4094-99bf-29a42b2a1e6a)

### Fonts

In order to use Chinese fonts like *SimSun* (新宋), *SongTi* (宋体), and *KaiTi* (楷体) on your iPhone, follow these steps:

1. Find a font file with the `.ttf` extension. e.g. `SongTi.ttf`

2. Rename the font file by adding an underscore before the font name and keeping the `.ttf` extension. For instance, rename `SongTi.ttf` to `_songti.ttf`.

3. Move the renamed font file to Anki's media folder. On MacOS, you can usually find this folder at `~/Library/Application\ Support/Anki2/user/collection.media`, where 'user' is your profile name in Anki.

4. Now, you need to load the font into your note type's CSS, typically located at the bottom of the CSS file. Use the following syntax:

```css
@font-face {
  font-family: songti;
  src: url('_songti.ttf');
}
```

Where `songti` will be the name you will use to stylize the cards on your CSS file.

### Audio

I  currently use Google Translate's voice into [AwesomeTTS](https://ankiweb.net/shared/info/1436550454) for generating audio files for my sentences.
