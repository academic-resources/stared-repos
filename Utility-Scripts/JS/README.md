## MARKDOWN TO HTML CONVERTER

This simple script converts all Markdown files in a directory and all its sub directories to html files.
Images are not included in the HTML files and also links will be lost.
All files will be inside a folder named "Converted" along with a random number at the root of the selected directory

### Requires

* node.js
* showdown.js

(showdown can be installed from npm using ```npm install showdown```)

### Usage

This script can be used directly from Terminal on Linux and Mac OSX

```./converter.js path/to/source/folder path/to/destination/folder```

------
### JAVASCRIPT SERVER

This script will instantiate a local server on the system's localhost port no 3000

### Requires

* node.js

### Usage

This script can be directly run from the terminal
node server.js
