---
title: Introduction to Vim
date: 2022-02-06
author: Komeno
cover: images/vim.png
description: Vim is one of the most powerful text editors you can think of. In this article, I will introduce you some basic and useful Vim commands.
tags:
  - Vim
---
Vim is one of the most powerful text editors you can think of. In this article, I will introduce you some basic and useful Vim commands.

## Vim modes
There are two main modes in Vim. Normal Mode and Insert Mode.
In Insert Mode you can type on the document as in any other text editor. In Normal Mode you can execute commands to navigate though the file or  modify it.

## Entering Normal Mode
Press the escape key to enter Normal Mode. (Most Vim users usually remap escape to caps lock. On a Mac you can do it using [Karabiner](https://github.com/pqrs-org/Karabiner-Elements).)

## Entering Insert Mode
To enter insert mode you just have to type `i` or `a` while on Normal Mode. If you entered Insert Mode with the `i` key, you will be able to insert text on the left side of your cursor. In contrast, with `a`, you will insert text on the right side of the cursor. `C` (Shift-c) deletes all the text from the cursor position to the end of the line and puts you in Insert Mode.

There is also `o` that allows you to insert text on the next line.

### Uppercased versions

`I` (Shift-i) will put you on insert mode on the beginning of the line.
`A` (Shift-a) will put you on insert mode on the end of the line.  `O` (Shift-o) will put on insert mode on the previous line. 

## Visual Mode
Visual Mode is used for selecting text.

- `v` Enter visual mode.
- `V` Enter visual line mode.
- `ctrl-v` Enter visual block mode.

## Exiting Vim
The most known way of exiting Vim is using `:wq` (write and quit) or `:q!` (quit without saving).

But, there is a more efficient ways of exiting Vim. You type `ZZ` (shift-zz) to exit Vim saving or `ZQ` (shift-zq) to exit it without saving.

- - - -

## Cursor Movement
### Basic Movement (HJKL)
- `H` Move to the left.
- `J` Move down.
- `K` Move up.
- `L` Move to the right.

### Movement word per word
- `w` Move to the next word.
- `W` Move to the next word (separated by whitespace).


- `b` Move a word backwards.
- `B` Move a word backwards (separated by whitespace).


- `e` Move to the end of the next word.
- `E` Move to the end of the next word (separated by whitespace).

You can use all of these commands with a count. e.g. `5w` to move the cursor 5 words forward.

### Moving the cursor
- `H` Put the cursor on the top.
- `M` Put the cursor on the middle.
- `L` Put the cursor on the bottom.

> Mnemonic: High, Middle, Low.  

### Movement by paragraph
- `{` Move the cursor a paragraph up.
- `}` Move the cursor a paragraph down.

## Movement through the line
### Including whitespace
`0` Go to the beginning of the line.
`$` Go to the end of the line.

### Not including whitespace
`^` Go to the beginning of the line.
`g_` Go to the end of the line.

## G and gg
Use `G` Go to the bottom of the file.
Use`gg` Go to the top of the file.

## f and t
- `f` followed by a word `a` moves the cursor the the next occurrence of the word `a` on a line.
- `t` followed by a word `a` moves your cursor a word before the the next occurrence of the word `a` word on a line.

### Example
```
The quick brown fox jumps over the lazy dog.
^
```

Using `fb`
```
The quick brown fox jumps over the lazy dog.
          ^
```

Using `tb`
```
The quick brown fox jumps over the lazy dog.
         ^
```

## Moving the screen
- `zt` Put the current line on the top of the screen.
- `zz` Put the current line on the middle of the screen.
- `zb` Put the current line on the bottom of the screen.

- - - -

## Deleting text
To delete text, you can use the `d` followed by what you want to delete.
(You can use all of the following commands with `c` instead of `d` to delete and CHANGE what you just deleted. In other words, it deletes and puts you on Insert Mode.)

### Counts
In Vim you can specify the number of times to execute a command. For example, you can delete a line with `dd` and `5dd` for deleting 5 lines at once. It also works for other commands like `5dap`, `5daw`, etc.

### Some delete commands
- `diw` Delete a word.
- `daw` Delete a word w/ surrounding whitespace.


- `di(` Delete inside a ().
- `da(` Delete a ()  w/ surrounding whitespace.


- `di[` Delete inside a [].
- `da[` Delete a [] w/ surrounding whitespace.


- `di{` Delete inside a {}.
- `da{` Delete a {} w/ surrounding whitespace.


- `dip` Delete inside a paragraph.
- `dap` Delete a paragraph w/ surrounding whitespace.


- `dit` Delete inside an HTML tag.
- `dat` Delete an HTML tag w/ surrounding whitespace.


- `dw` Delete word, only works if the cursor is positioned on the beginning of the word.
- `D` Delete from the cursor to the end of the line.
- `dd` Delete the current line.
- `5dd` Delete the next 5 lines.


- `dG` Delete from the current line until the end of the document.
- `dgg` Delete form the current line until the beginning of the document.

## Copying and Pasting
- `y` (for YANK) copy. (e.g. to copy a word type `yw`)
- `yy` Copy a whole line.
- `p` Paste.

## Searching
- `/` Search. (Navigate with ‘n/N’)
- `?` Search backwards. (Navigate with ‘n/N’)


- `//` Search for the last pattern searched.
- `??` Search for the last pattern searched backwards.


- `*` Search the current word.
- `#` Search the current word backwards.


- `:set ic` Search case insensitively.

## Replacing Text
```
:%s/old/new/g
:%s/old/new/gi (case insensitive)
:%s/old/new/gc (prompts before each replacement)
```

## Undo and Redo
- `u` Undo the last change.
- `U` Undo the last changes on the current line.
- `ctrl-r` Redo the last change.

## Tabs
- `:tabnew` Open a new tab.
- `:tabnext` Go to the next tab. (Also `:tabn`)
- `:tabprevious` Go to the previous tab. (Also `:tabp`)
- `:tabfirst` Go to the first tab.
- `:tablast` Go to the last tab.
- `:tabmove (num)` Move the current tab to the specified `num`.

## Editing
`edit` or `e` open a file in Vim. (On a new tab for example.)

## Macros
Start / Stop recording a macro with `q` on one of Vim’s 26 registers (a-z).
Use `@` with the register key to play the recorded macro.
You can play it `n` times with `n@q` with `q` being the register.

## Marks
Record your current position in a register.

- `mb` Set a mark on register `b`. (Using an uppercased mark like `mB` makes it accessible on all the files being edited.)
- `’b` Go the the mark set on `b`.
- `:marks` List all the current marks.
- `:delmarks b` Delete a mark.
- `:delmarks a-c` Delete a range of marks.
- `:demarks!` Delete all the marks.

## . command
Rerun the last executed command on Normal Mode.

## g
- `g` + hjkl, 0, $, etc navigates an one line paragraph.
- `gq` Reformat an one line paragraph.
- `ga` Give you the ASCII value of the current character.
- `gf` Open the file under the cursor.
- `gi` Continue inserting text to where you were before.

## Indentation
Indent the current line using `<` and `>`.

## Running a Shell command
Use `:!` to run a Shell command.
e.g. `:! ls` to run `ls`.

## %
 `%` Jump to the matching parenthesis, brackets, etc.
