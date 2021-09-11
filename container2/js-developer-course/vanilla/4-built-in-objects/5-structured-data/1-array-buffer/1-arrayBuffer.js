/*
ArrayBuffer object is used to represent a generic, fixed-length
raw binary data buffer.

It is an array of bytes, often referred to in other languages as
"byte array". You cannot directly manipulate the contents of an
ArrayBuffer, instead, you create one of the typed array objects
or a DataView object which represents the buffer in a specific format,
and use that to read and write the contents of the buffer.

You can use ArrayBuffer() constructor to create a new ArrayBuffer of
the given length in bytes, or you can also get an array buffer from
existing data, for example from a Base64 String or from a local file.
 */

const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
