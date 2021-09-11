example:: example/build/all.js

example/build/all.js: $(wildcard example/src/*)
	mkdir -p $(@D)
	./node_modules/.bin/browserify -t ./index example/src/main.js > $@

link test install publish:
	npm $@
