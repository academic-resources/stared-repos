all: jshint coverage

setup:
	npm install

dist: all
	rm -rf _build
	mkdir _build
	cp -r src/* _build
	cp package.json _build
	cp LICENSE _build
	cp AUTHORS _build
	cp README.md _build
	cp CHANGELOG _build

release: dist
	cd _build; npm publish

jshint: setup
	jshint src

test: jshint
	mocha -R spec --recursive src/test

coverage: setup
	istanbul cover ./node_modules/.bin/_mocha -- -R spec --recursive src/test

coveralls:
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

VERSION := $(shell node -e "console.log(require('./package.json').version);")
browser_bundle: setup
	browserify $(realpath src/index.js) --s algorithms | uglifyjs -c -m --screw-ie8 --wrap --preamble "/* algorithms.js v$(VERSION) | (c) 2014 Felipe Ribeiro | https://github.com/felipernb/algorithms.js/blob/master/LICENSE */" > bundle/algorithms.browser.min.js

