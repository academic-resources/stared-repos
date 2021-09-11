# Static-Pages
Guide/comparison of ways to create and host static pages

## What is a static webpage?
Any webpage where all the content (HTML, JavaScript, CSS, images) is loaded in
and rendered by the user's browser ("front-end"). There are some important
benefits and limitations of this:

- *Can* host freely/cheaply at a bunch of places, deploy and switch hosts
easily.
- *Can* be built with a variety of tools and play nicely with almost any
language/framework/ecosystem.
- *Can't* persist user data across sessions/devices (or need to rely on external
service to do so, or can do
[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
but that won't go across devices and the user may wipe it).
- *Can't* use a secret API key to connect to a service - anyone who loads the
page could extract the key and abuse the service (and get your access
suspended). Can still connect to unauthenticated APIs.

Static just means "unchanging", and overall that's what static webpages are good
for - content that doesn't change. However, front-end frameworks like
[React](https://github.com/facebook/react) have blurred the lines a bit, and you
can have a front-end application that is static from a code/infrastructure
perspective but is still dynamic and engaging to the user. So get creative! Take
advantage of the many tools and services available, and you can build an awesome
webpage that maximizes the advantages and minimizes the disadvantages of being
static.

## How can I build a static webpage?
The simplest thing to do is just build it "by hand" - that is, use a text editor
and write .html, .css, and .js files to your hearts content. This "back to
basics" approach can be appropriate for things that are really simple, really
won't need lots of updates, and also if you're just feeling nostalgic or want to
reinforce your knowledge on the basics (which helps with everything else).

For more substantial and/or frequently updated pages, it's a good idea to use a
static site generator - a tool that renders all the actual HTML/JS/CSS based on
templates, configuration settings, and usually
[Markdown](https://daringfireball.net/projects/markdown) files for the actual
content. There is an absurd number of these generators, you can
[check out popular ones here](https://www.staticgen.com).

With many options come many opinions, but in general you can't go wrong with
anything that is well-maintained and has a good community around it. It's also a
good idea to pick something that is either a language/framework that you know
about or are interested in learning more - as you start to try to customize your
page you'll find yourself digging in to how the generator actually works, so
it's good to choose accordingly.

Some top highlights:

- [Jekyll](https://jekyllrb.com) - Ruby, it's been around (mature/stable), and
is what actually powers GitHub pages if you just push Markdown files (see also:
[Octopress](http://octopress.org)).
- [Hexo](https://hexo.io) - Node.js, essentially a JavaScript take on Jekyll
(compatible with the same Markdown and similar plugin ecosystem).
- [Hugo](http://gohugo.io) - Go, *extremely fast*, great for generating *big*
sites. Also just a single binary, so no need to mess with package management or
dependencies for installation.
- [Pelican](https://blog.getpelican.com) - Python, supports a variety of content
formats and integrates/imports from WordPress and others.
- [Gatsby](https://github.com/gatsbyjs/gatsby) - React, creates a "dynamic"
static site (a Single Page Application where everything is loaded on the initial
request and further clicking/browsing doesn't refresh the page).
- [Brunch](http://brunch.io) - JavaScript, not really a blog generator like the
above but rather a build tool/pipeline to simplify making a modern static site.

## How/where can I deploy a static webpage?
One of the big advantages of static webpages is the ease and flexibility of
deployment. To deploy all you do is copy the files to the server that serves
them - that's it! The only dependency is a basic webserver that listens to and
returns basic HTTP requests. You can of course build/deploy your own server (and
that is an excellent exercise), but for our purposes here we'll consider some of
the many excellent free/cheap services that do this for you.

### Start Simple - GitHub Pages
[GitHub Pages](https://pages.github.com) are a great way to get started, and
actually still a strong choice as you scale up. It's a free service, but can
handle substantial traffic, supports custom URLs/domains, and gives SSL. The
deploy process is simple - just enable GitHub Pages in the settings page for
your repository. You have a few options:

- Use the `master` branch - this means any content in the master branch of
`github.com/user/repo/` will be served from `user.github.io/repo/`. Good for
repos that are entirely meant to be webpages.
- Use the `gh-pages` branch - content in `gh-pages` will be served per the same
URLs as above. Good for repos that use a tool/template to generate the page (you
save that to your `master` branch and save the built output to `gh-pages`).
- Use the `/docs` folder on the master branch - good for non-webapp projects
(e.g. tools, games, etc.) where you want to serve the documentation as a page.

This particular repository is using the first approach, so you can read this
very file from [https://lambdaschool.github.io/Static-Pages/](https://lambdaschool.github.io/Static-Pages/)
(if you're not already). Note that if you do this you will not see the true
Markdown source - instead, it will be rendered to HTML by Jekyll (mentioned
earlier). You can even apply themes and generally maintain a simple webpage on
GitHub without writing a line of HTML - read
[their Jekyll documentation](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)
for more details.

The deploy process is as simple as a `git push` of your content to the correct
branch or folder. There exist packages to script/automate this, and you can
write your own fairly easily. Also note that most GitHub competitors have
similar services
([Bitbucket](https://confluence.atlassian.com/bitbucket/publishing-a-website-on-bitbucket-cloud-221449776.html),
[GitLab](https://about.gitlab.com/features/pages/), etc.), and this competition
helps prevent lock-in (you can pretty easily move your content between them).
Configuring these services is a matter of reading their documentation and
browsing their setting pages, but for the most part things like custom domains
and SSL certificates should be straightforward or possibly automatic.

You can also find tools that automate this process, or write your own script
once you've settled on a workflow. Search [npm](https://npmjs.com) or your
preferred package ecosystem and see what options exist - but just doing it
directly in git is simple enough that it's good to understand it there too.

### Dedicated Hosts - Netlify, Surge, Forge
If you want a service that just hosts pages, and doesn't offer it as a simple
"add-on" for source code hosting, there are plenty of options. The focus here is
services meant for coders - so you can interact with them and push content to
them from the command line. Any web host that lets you upload content can work,
but will be harder to automate and generally teach you less than using one of
these options.

- [Netlify](https://www.netlify.com/) - generous free tier, can connect to
GitHub repositories, handle forms, facilitate A/B testing, continuous
deployment, and more. Paid service is mostly for multiuser/enterprise.
- [surge](http://surge.sh/) - similar to Netlify, good free tier, somewhat
fewer options but if you don't intend to use them that may be a good thing.
- [Forge](https://getforge.com/) - not free (but cheap to start), emphasis on
speed and simplicity (optimized CDN and JS processing, cli for programmers but
also supports just dragging/dropping files or connecting Dropbox for others).

To actually use these services, just follow the tutorial/guide they offer - the
general pattern is "install something (probably from npm), then run it." Try a
few and see which one you like/works for your use case.

There are other options, and these three may grow or disappear as the web
continues to evolve. But there will likely always be options along these lines,
and when you're making static content it's pretty easy to switch hosts - just
push your content somewhere else!

### Big Players - Amazon, Google, Microsoft
If you're making something Real - it's got to scale, it's got to load fast
around the globe, and if it goes down pagers need to ring - then these are some
options to consider. The line between the above simpler approaches and these
"industry-grade" services isn't clear - especially if you go with a paid tier
for the above services, you can definitely use it for something important. And
even the free tiers are pretty reliable, but ultimately any free service doesn't
provide the same sort of
[SLA](https://en.wikipedia.org/wiki/Service-level_agreement) as a paid one.

The other big reason to go with one of these is if you're using them anyway -
each of these providers offers a slew of "cloud" services, and if you're using
them for other things you may as well fire up their static file hosting.
Compared to most of their other services, it's a fairly simple thing to do, and
definitely scales great without costing too much.

- [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) -
gives you "buckets" in different regions where you can upload your content. You
may have to configure to make sure you've got good global coverage. Can be
integrated with [CloudFront](https://aws.amazon.com/cloudfront/), the AWS CDN,
to get even better performance around the world.
- [Google Cloud Storage](https://cloud.google.com/storage/docs/hosting-static-website) -
also uses "buckets", and also integrates with their
[CDN](https://cloud.google.com/cdn/). Basically the Coke/Pepsi decision, and
ultimately a decision that will be made for reasons besides static content.
- [Azure Static Content Hosting](https://docs.microsoft.com/en-us/azure/architecture/patterns/static-content-hosting) -
yes, Microsoft too has a cloud, though they use "blobs" rather than "buckets."
They even have a
[CDN](https://docs.microsoft.com/en-us/azure/cdn/cdn-cloud-service-with-cdn),
and other services more or less comparable to Amazon and Google. They are a less
popular choice for a variety of practical and historical reasons, but some
clients will use them and they do offer generous free credits to a lot of users.

How do you use these services? Read the documentation - it'll change fast, and
generally involve lots of platform-specific settings and commands. The general
concept though is the same - you just want to push some built static content to
some path on the server that will be served via a webserver at some domain.

## Closing Notes and "Gotchas"
Now you know the basics on what a static page is and how to get it out there -
actually having static content worth putting out there is another matter. Lots
of prominent developers maintain blogs (often built and hosted with the above
tools/services), and getting in the habit of writing your thoughts and
experiences with technology can help you organize and develop as well as market
yourself.

Some examples of high quality tech blogs for inspiration:

- [Slack Engineering Blog](https://slack.engineering/) - gives great
transparency and real technical details for what's going on at Slack. Simple but
pleasing and highly readable design, and good quality writing (clearly it's a
team effort, and they likely review each others posts before publishing).
- [CSS-Tricks](https://css-tricks.com/) - great current front-end and design
content, and as one would expect - very pleasing design.
- [Smashing Magazine](https://www.smashingmagazine.com/) - more for developers
and designers, and also a good example of a blog incorporated into a larger
site.
- [Beej's Bit Bucket](https://beej.us/blog/) - simple, readable, fast, Beej.

Another typical use of static pages is for resumes - there are
[tools specific for building them](https://github.com/salomonelli/best-resume-ever),
and [lots](http://www.rleonardi.com/interactive-resume/)
[of](https://magemello.github.io/) [crazy](http://liugle.com)
[cool](http://www.anniwang.com) [examples](https://phildub.com)
[out](http://www.kickjannic.com) [there](http://www.guillaumejuvenet.com).


Besides what content to put out there, you're likely to run into issues as you
get started, especially if you're doing something fancy like hitting an API. In
particular, if your page is hosted by a service that uses HTTPS and you try to
pull data from an API that uses HTTP (or vice-versa), it probably won't work. If
you open up your browser debugger console you should see something like:

```
Mixed Content: The page at 'https://tsj7.github.io/YouTube-Clone/' was loaded
over HTTPS, but requested an insecure resource 'http://www.youtube.com/embed/-40p_dZccPg'.
This request has been blocked; the content must be served over HTTPS.
```

Basically, "don't cross the streams!" Ideally you should use HTTPS for both, it
is the default for GitHub Pages and most other hosting services linked above.
[Heroku](https://heroku.com) (another hosting service you may use for backends)
also supports it, and most modern well-maintained APIs should as well. So the
first thing to try if you hit this is to change whatever is HTTP to HTTPS and
see if it works.

If it doesn't, and you really need to use it, then (at least for prototyping)
you can figure out disabling HTTPS for the other side. For GitHub Pages this is
accessible under the settings for the repository.

Other "gotchas" you may hit - with `git` based deployment, make sure you have
the upstream repo set appropriately. `git remote -v` will verbosely list the
remotes that git knows about, and can help debugging. And in general, proper git
hygiene (regular commits with good messages, clearly named branches, etc.) will
pay off, just as it does with regular development.
