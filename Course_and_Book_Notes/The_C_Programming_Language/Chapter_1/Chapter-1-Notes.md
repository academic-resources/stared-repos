### Basics

In a C program, you are usually able to name functions whatever names you would like to name them, with the exception of main. main is a special name because your program begins executing at the beginning of main. main usually invokes other functions, some coming from your program, others coming from previously written libraries. One method of communiating data between functions is the use of arguments, which are placed in the parentheses following a function name. If there are no arguments, a pair of empty parentheses follow a function name. Braces enclose statements that make up the function and are analogous to DO-END in PL/I and begin-end in Algol/Pascal, etc. A function is invoked by naming it, followed by a parenthesized list of arguments to be given to the function. Parentheses must be present even if there are no arguments.

In the function:

```
main ()
{
    printf("hello world\n");
}
```

`printf("hello world\n");` is a function call to printf with the argument "hello, world\n".

The sequence of any number of characters enclosed in double quotes are called a _character string_ or _string constant_.

All variables must be declared before use. A declaration includes a declaration type followed by the variables which will have that type:

```
int lower, upper, step;
float fahr, celsius;
```

An `int` implies the variables listed are `integers` while a `float` implies the numbers may have a fractional part. A float number is 32-bits, so it amounts to about seven significant digits.

Other data types include:

```
char    character -- a single byte
short   short integer
long    long integer
double  double-preciison floating point
```

The body of a `while` can be one or more statements enclosed in braces or a single statement without braces. The condition in parentheses is tested. If true, the body of the loop is executed. When the test stops being true, the loop ends and execution continues at the statement following the loop. If there are no further statements, the program terminates.

In the `fahrenheit-celsius` program, the reason the division is done with `5.0/9.0` is that in C, integer division truncates, discarding the fractional, which is not the desired behavior if we want the answers to be floats. `%4.0f` tells printf to print `fahr` in a space at least four characters wide and with no digits after the decimal. `%6.1f` says to have the number occupy six spaces, with one digit after the decimal point.

`%.2f` specifies two digits after the decimal point but does not constrain width. `%6f` says the number has to be at least six characters wide.  
printf also recognizes `%d` for decimal integer, `%o` for octal, `%x` for hexadecimal, `%c` for character, `%s` for character string, and `%%` for _%_ itself.

"In any context where it is permissable to use the value of a variable of some type, you can use an expression of that type"

The `for` loop is usually appropriate for loops in which the initialization and reinitialization are single statements and logically related.

#### Symbolic Constants

It's bad practice to have "magic numbers" in your program that may be difficult for another human to infer meaning from in the future as they can be difficult to figure out and it makes them hard to change in a systematic way.

`#define` is one way to avoid magic numbers because you can define a symbolic name or symbolic constant to be a particular string of characters. The compiler then replaces all unquoted occurrences of that name with the corresponding string (the replacement for the name can actually be any text at all and isn't limited to numbers).

Symbolic names are commonly written in uppercase so as not to be confused for variable names. They do not require semicolons following their definitions as the semicolon would be included in the substitution.

### Character Inp9ut and Output

`getchar()` fetches next input character and returns that character as its value.

`putchar()` is the complement of `getchar` and prints the contents of it to some output medium (usually the terminal). Calls to `putchar` and `getchar` can be interleaved and output will appear in the order in which calls are made.

Nesting an assignment in a test is one of the places C permits valuable conciseness.

It's important to recognize that parentheses around assignment within a conditional are necessary because, for example, precdence of `!=` is higher than that of `=` which means that the relational test would be performed before the assignment:

```
    c = getchar() != EOF

is equivalent to

    c = (getchar() != EOF)
```

You can have a for loop with a body that's empty (if the work is done in the test and re-inilitialization bits), but the grammatical rules of C require that a for statement have a body, so an isolated semicolon can be used to indicate a `null statement`.

`\n` is the newline character. Any single character can be written between single quotes to produce a value equal to the numerical value of the character (character constant). `'A'` is a character constant that in ASCII has the value of 65.

It should be noted that `'\n'` is a single character equivalent to a single integer, but `"\n"` is a character string that happens to contain one character.
