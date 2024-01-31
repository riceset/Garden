---
title: "How to enable image preview on Ranger using Kitty"
date:   2021-08-09
tags: [terminal]
---
# How to enable image preview on Ranger using Kitty

![[ranger.png]]

## Getting Started
First, create a config file for Ranger in `~/.config/ranger` called `rc.conf`

```sh
cd ~/.config/ranger && touch rc.config
```

Open the config file and add the following lines to it:

```sh
set preview_images true
set preview_images_method kitty
```

Install the [Pillow](https://pillow.readthedocs.io/en/stable/#) library using `pip` (Python’s package installer)

```sh
pip install Pillow
```

The image preview feature should be working now. If you’re getting an error, try following the steps below.

## ERROR: Image previews in kitty require PIL (pillow)
First, check where Python is located on your computer using the `which` command.

```sh
which python
```

You should see something other than `/usr/bin/python` and that’s probably the reason why you are getting this error.

In my case, I installed Python through [ASDF](https://asdf-vm.com/). So I get the following output when I run `which python`:

```sh
/Users/riceset/.asdf/shims/python
```

You should copy this path.
- - - -

Now go to where Ranger is installed. If you installed it via [Homebrew](https://brew.sh), you should go to `/usr/local/Cellar/ranger/1.9.3/libexec` where 1.9.3 is the version of Ranger that you have installed.

Open `ranger.py` with Vim or any other text editor and replace this line:

```sh
#!/usr/bin/python -O
```

with the path to where Python is located. In my case it was:

```sh
#!/Users/riceset/.asdf/shims/python
```

Now, save the file and everything should be working.

![[preview.png]]
