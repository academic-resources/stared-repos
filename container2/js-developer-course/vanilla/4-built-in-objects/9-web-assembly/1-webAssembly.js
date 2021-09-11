/*
`WebAssembly` object acts as the namespace for all WebAssembly-related
functionality. It is not a constructor (not a function object).

Primary uses:
+ Loading WebAssembly code with `WebAssembly.instantiate()`
+ Creating new memory and table instances
+ Providing facilities to handle errors that occur in WebAssembly
 */

/*
STATIC METHODS

+ instantiate()
primary API for compiling and instantiating WebAssembly code, returning
both a `Module` and its first `Instance`.

+ instantiateStreaming()
compiles and instantiate a WebAssembly module directly from a streamed
underlying source, returning both a Module and its first Instance.

+ compile()
compiles a WebAssembly.module from WebAssembly binary code, leaving
instantiation as a separate step.

+ compileStreaming()
compiles a WebAssembly.module directly from a streamed underlying
source, leaving instantiation as a separate step.

+ validate()
Validates a given typed array of WebAssembly binary code,
returning whether the bytes are valid WebAssembly code or not
 */

/*
CONSTRUCTORS

+ Global()

+ Module()

+ Instance()

+ Memory()

+ Table()

+ CompileError()

+ LinkError()

+ RuntimeError()
 */
