# reactify-server-rendering

![unmaintained](http://img.shields.io/badge/status-unmaintained-red.png)

This is the simplest API I could come up with to allow rendering React on the server using Browserify in a flexible way.

## Requirements

You need to install `react-tools` **globally**. This will not be done automatically for you.

## Example with Django

First browserify your app (you can do this with `reactify-server-rendering-tools` as well):

```sh

node_modules/.bin/browserify -t reactify -r reactify-server-rendering -r ./pages/Home > django_static/bundle.js

```

Then use the following code to generate static HTML on the client (example for Python):

```python
import execjs
import json

class DjangoReact(object):
    def __init__(self, local_bundle, bundle_url):
        self.bundle_url = bundle_url
        with open(local_bundle, 'r') as f:
            self.runtime = execjs.compile(f.read())

    def render_page(self, module, **props):
        return self.runtime.eval(
            'require("reactify-server-rendering").serverRender(%s, %s, %s)' % (
                json.dumps(module),
                json.dumps(props),
                json.dumps(self.bundle_url)
            )
        )
```
