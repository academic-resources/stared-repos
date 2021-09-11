PATH    := $(shell pwd)/node_modules/.bin:$(PATH)

test:
	rm -fr sandbox
	mkdir -p sandbox/foo/bar/baz
	touch sandbox/foo/bar/baz/file
	touch sandbox/foo/bar/file
	touch sandbox/foo/file
	touch sandbox/file
	ln -s ../../.. sandbox/foo/bar/baz/link
	ln -s ../.. sandbox/foo/bar/link
	ln -s .. sandbox/foo/link
	ln -s . sandbox/link
	NODE_ENV=test vows tests/find.js tests/copy.js tests/mkdir.js tests/link.js tests/remove.js --spec

docs:
	#ndoc

.PHONY: test docs
.SILENT:
