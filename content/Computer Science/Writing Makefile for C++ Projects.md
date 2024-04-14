# Writing Makefile for C++ Projects

## Setting variables
Let's start by setting some basic variables:

```makefile
# The program name:
NAME = program

# The compiler
CXX = c++
```

> [!notes] Considerations
> > **Note:**
> The variable `CXX` is used to specify the C++ compiler. The command `c++` is analogous to using `cc` for compiling C programs. This is similar to how `g++`/`gcc` are used for GNU Compilers, and `clang`/`clang++` for Clang compilers.

## Flags
Here, we are setting the compilation flags used in École 42's C++ modules.

More specifically:
- `-Wall`: Enable all compiler's warning messages
- `-Wextra`: Enable extra warning messages that are not turned on by `-Wall`
- `-Werror`: Turn all warning messages into errors
- `-std=c++98`: Specify the C++ version to conform

```makefile
CXXFLAGS = -Wall -Wextra -Werror -std=c++98
```

## Specifying the source files
In the `SRCS` variable we can specify all the `.cpp` files used in the project. These are the files that are going to be compiled into object files (`.o`) and then combined into an executable file.

```makefile
SRCS = megaphone.cpp
OBJS = $(SRCS:.cpp=.o)
```

> [!notes] Notes on OBJS
> The `OBJS` variable is a special computed variable that takes all the values from the `SRCS` variable that has the `.cpp` extension and turns into a `.o` file.

## Defining some basic rules
When writing a Makefile we usually define 4 basic rules. Those are:

- `all`: Compile the program
- `clean`: Clean all object files
- `fclean`: Clean all object files + the executable file
- `re`: Clean everything that was generated and generate everything again (`fclean` + `all`)

```makefile
all: $(NAME)

$(NAME): $(OBJS)
	$(CXX) $(CXXFLAGS) $(OBJS) -o $(NAME)

clean:
	$(RM) $(OBJS)

fclean: clean
	$(RM) $(NAME)


re: fclean all
```

Let's analyze each line here.

### all
To compile the program we just have to run `make all` but as `all` is the first rule that is getting specified, simply running `make` will execute `make all`.

```makefile
all: $(NAME)
```

As we can see here, `all` depends on the creation of `$(NAME)` which is the program name, in other words the executable file. At this point, we don't have the executable file yet, so `make` searches for a rule that creates `$(NAME)`:

```makefile
$(NAME): $(OBJS)
	$(CXX) $(CXXFLAGS) $(OBJS) -o $(NAME)
```

The creation of `$(NAME)` depends on the creation of all object files on this project so they are created. After the creation of `$(OBJS)` we finally can run `$(CXX)` (the compiler) specifying `$(CXXFLAGS)` (our compilation flags) passing all the object files to compile and naming the final product to `$(NAME)`.

To better illustrate this imagine you have 2 C++ files:

```sh
main.cpp
other.cpp
```

We want to name our executable file as `program`:

```makefile
c++ -Wall -Wextra -Werror -std=c++98 main.o other.o -o program
```

This is the actual command that gets executed.

### Creating object files

This is the rule used to create object files. It basically says: For any C++ file, generate an object file. It also depends on the `INCLUDES` so if any header file changes, all object files are going to get regenerated. Then it compiles each `.cpp` file (represented by the automatic variable `$<` here) to an object file (with the `-c` flag) and outputs a file with the same name but with the `.o` extension. Here `$@` represents each `.o` file:

```makefile
%.o: %.cpp $(INCLUDES)
	$(CXX) $(CXXFLAGS) -c $< -o $@
```

### Implementing clean

To implement `clean`, `fclean` and `re` is really simple.

`clean` just removes all object files so:
```makefile
clean:
	$(RM) $(OBJS)
```

`fclean` calls clean to remove all object files and in addition, also removes the executable file:
```makefile
fclean: clean
	$(RM) $(NAME)
```

`re` runs `fclean` and `all`:
```makefile
re: fclean all
```

### .PHONY?
`.PHONY` is used to indicate that a target is not a real file but a command or routine to be executed. For example, running `make clean` executes the `clean` routine, even though there is no file named `clean`.

```makefile
.PHONY: all clean fclean re
```

This sums up the creation of a basic Makefile for some basic C++ projects.
