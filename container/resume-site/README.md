# resume-site  
**resume-site** is a Flask-driven, single-page resume site.
The design implements the [Orbit](https://themes.3rdwavemedia.com/website-templates/orbit-free-resume-cv-template-for-developers/) bootstrap template for a simple, yet colorful, look and feel.
Data and design are decoupled by using an [HTML template](https://github.com/johnmarcampbell/resume-site/blob/master/app/templates/index.html) to parse a [python dictionary](https://github.com/johnmarcampbell/resume-site/blob/master/app/defaults.py) which stores all the information contained in the resume.

## Running resume-site
Running **resume-site** on your local machine is simple. Import the `app` module, create an `app` instance, and run it. You can do this in a python interpreter or standalone script like so:  


```python  
import app
app.create_app().run()  
```  

This will start Flask's own web server and make **resume-site** available at `127.0.0.1:5000`.
However, this will render the site with the default resume information.
You likely want to include your own information, which you can do by following the steps below.

## Customizing resume-site

### Including your own info
All of the data that goes into building the resume (contact info, work experience, etc.) is stored in a python dictionary.
You can find a full example in the [default version](https://github.com/johnmarcampbell/resume-site/blob/master/app/defaults.py) (`app/defaults.py`), but an illustrative excerpt is below:

```python
resume_data = {
    'site_title' : 'Responsive Resume/CV Template for Developers',
    'name' : 'Alan Doe',
    'tagline' : 'Full Stack Developer',
    'email' : 'alan.doe@website.com',
    'phone' : '0123 456 789',
    'website' : 'portfoliosite.com',
    'linkedin' : 'linkedin.com/in/alandoe',
    'github' : 'github.com/username',
    'twitter' : '@twittername',
    ... etc. ...
    }
```

To put your own resume information in to **resume-site**, simply create a file called (for example) `my_resume.py` in the project root directory (i.e., *above* the `app` directory).
Write a python dictionary with the same structure as the one in `app/defaults.py`.
You can then start the Flask app, but specify your resume information in the constructor, like so:

```python  
import app
from my_resume import resume_data
app.create_app(resume_data).run()  
```  
