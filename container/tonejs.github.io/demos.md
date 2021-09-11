---
layout: default
title: demos
---

# Demos

<a id="submit" href="https://goo.gl/forms/lS7HCvRCULlRdCXm1">SUBMIT PROJECT</a>

<link rel="stylesheet" type="text/css" href="/assets/css/demo.css">
<div id="demos">
	{% for demo in site.data.demos %}
		<div class="demo">
			<a href="{{demo.url}}" target="_blank">
				<img src="{{demo.image}}">
			</a>
			<div id="title">
				<div id="text">{{demo.title}}</div>
			</div>
		</div>
	{% endfor %}
</div>