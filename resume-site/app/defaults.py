"""
Summary
-------
The summary is a brief intro. You can put raw HTML into this field.
"""
summary = '<p>Summarise your career here lorem ipsum dolor sit amet, consectetuer adipiscing elit. You can <a href="http://themes.3rdwavemedia.com/website-templates/orbit-free-resume-cv-template-for-developers/" target="_blank">download this free resume/CV template here</a>. Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.</p>'


languages = [
        ['English', ' (Native)'],
        ['French', ' (Proffesional)'],
        ['Spanish', ' (Proffesional)']
        ]

education = [
        ['MSc in Computer Science', 'University of London', '2011 - 2012'],
        ['BSc in Applied Mathematics', 'Bristol University', '2007 - 2011']
        ]

interests = ['Climbing', 'Snowboarding', 'Cooking']

skills = [
        ['Python & Django', '98%'],
        ['Javascript & jQuery', '98%'],
        ['Angular', '98%'],
        ['HTML5 & CSS', '95%'],
        ['Ruby on Rails', '85%'],
        ['Sketch & Photoshop', '60%']
        ]

"""
Experience
----------
This should be a list of lists. Each sublist corresponds to a particular job
and is of the form:
    ['Title', 'Date range', 'Company name and location', 'Description of role']

The 'Description of role' field does not get escaped by the templating engine,
so you can put raw HTML in it if you like.
"""
experience = [
        ['Lead Developer',
            '2015 - Present',
            'Startup Hubs, San Francisco',
            '<p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo.</p>  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>'
        ],
        ['Senior Software Engineer',
            '2014 - 2015',
            'Google, London',
            '<p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>'
        ],
        ['UI Developer',
            '2012 - 2014',
            'Amazon, London',
            '<p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>'
        ]
    ]

"""
Projects
--------
The project_intro field is for a short introduction to your work.
Project are a list of lists, where each sublist refers to a specific project,
and is of the form:
    ['Title', 'Description', 'Link to project webpage']
"""
project_intro = '<p>You can list your side projects or open source libraries in this section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et ligula in nunc bibendum fringilla a eu lectus.</p>'
projects = [
        ['Velocity',
            'A responsive website template designed to help startups promote, market and sell their products.',
            '#hook'
        ],
        ['DevStudio',
            'A responsive website template designed to help startups promote, market and sell their products.',
            'http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-web-development-agencies-devstudio/'
        ],
        ['Tempo',
            'A responsive website template designed to help startups promote their products or services and to attract users &amp; investors.',
            'http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-for-startups-tempo/'
        ],
        ['Atom',
            'A comprehensive website template solution for startups/developers to market their mobile apps.',
            'http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-mobile-apps-atom/'
        ],
        ['Delta',
            'A responsive Bootstrap one page theme designed to help app developers promote their mobile apps.',
            'http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-for-mobile-apps-delta/'
        ]
    ]



"""
default_data
------------
This dictionary puts everything together. It will be read by the Flask app when
it is instantiated.
"""
default_data = {
    'site_title' : 'Responsive Resume/CV Template for Developers',
    'name' : 'Alan Doe',
    'tagline' : 'Full Stack Developer',
    'email' : 'alan.doe@website.com',
    'phone' : '0123 456 789',
    'website' : 'portfoliosite.com',
    'linkedin' : 'linkedin.com/in/alandoe',
    'github' : 'github.com/username',
    'twitter' : '@twittername',
    'languages' : languages,
    'education' : education,
    'interests' : interests,
    'skills' : skills,
    'summary' : summary,
    'experience' : experience,
    'project_intro' : project_intro,
    'projects' : projects
    }
