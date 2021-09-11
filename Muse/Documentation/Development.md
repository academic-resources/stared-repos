<div align="center">

# Development of Muse

This section details the technical aspects of this project's development.  
To learn what Muse is, its features, and how to use it, see the [README](../README.md).

**TOC**  
[Technologies](#technologies) ● [Concept](#concept) ● [Models](#models) ● [Routes](#routes) ● [Wireframes](#wireframes) ● [Dev Snapshots](#development-snapshots) ● [Contact](#contact)

</div>

<div align="center">

## Technologies

</div>

- **LANGUAGES** JavaScript, Python 3, CSS
- **FRONTEND** React, React Router, Redux, styled-components, MUI
- **BACKEND** Flask, SQLAlchemy, PostgreSQL, Alembic
- **TOOLS** Docker, Heroku, Visual Studio Code, Redux-logger
- **LIBRARIES** Tone.js, beautiful-react-dnd, react-heatmap-grid, Flask-WTF, WTForms, Mashmallow-SQLAlchemy, Werkzeug, react-modal, react-animated-slider

<div align="center">

## Concept

</div>

**DESIGN** Minimalistic design catered towards an intuitive, non intrusive and seemless user experience to allow the transfer of ideas without distraction.

**COLOR SCHEME** Street styled, dark alley, with neon colors inspired the main color splash of the application. Nothing too flashy as to become distracting, but still clean and aesthetic with a hint of modern design, to provide a pleasing productive workbench experience for Artists.


<div align="center">

## Models

  **TABLES**  
  [users](#users) | [boards](#boards) | [pads](#pads) 
  
</div>

The database schema evolved and changed quite a bit continually throughout the process to accommodate new ideas, cleaner pipelines, and future features. A few examples exist of the schemas we drew up during the process, but likely by the time of this reading, the models written here are somehow out of date.

### `users`
| users      | Constraints                                   |
| ---------- | --------------------------------------------- |
| id         | SERIAL, PRIMARY KEY                           |
| username   | VARCHAR(25) NOT NULL, UNIQUE                  |
| email      | VARCHAR(320), NOT NULL, UNIQUE                |
| hashword   | VARCHAR(255) NOT NULL                         |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |

### `boards`
| columns    | Constraints                                   |
| ---------- | --------------------------------------------- |
| id         | SERIAL, PRIMARY KEY                           |
| title      | VARCHAR(25), NOT NULL                         |
| bpm        | INTEGER, NOT NULL, DEFAULT VALUE=1000         |
| user_id    | INTEGER, FOREIGN KEY=users.id, NOT NULL       |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |

### `pads`
| columns    | Constraints                                    |
| ---------- | ---------------------------------------------- |
| id         | SERIAL, PRIMARY KEY                            |
| title      | VARCHAR(64), NOT NULL                          |
| color      | VARCHAR(64), NOT NULL, DEFAULT VALUE='#AFB1D4' |
| multiplier | INTEGER, DEFAULT VALUE=1                       |
| block_seq  | ARRAY(INTEGER), NOT NULL                       |
| note_seq   | ARRAY(STRING), NOT NULL                        |
| user_id    | INTEGER, NOT NULL, FOREIGN KEY=users.id        |
| board_id   | INTEGER, NOT NULL, FOREIGN KEY=boards.id       |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date()  |

---

<div align="center">

## Contact Me

Thank you for taking a look at Muse.
Please feel free to reach out and ask us anything.
</div>

### Aaron Hanson
*(Full-stack developer, Open to work)*
<!-- <a href="./Aaron_Hanson(v2.0).pdf" download>![Resume PDF](https://img.shields.io/badge/-Resume-f00?style=flat-square&logo=adobe-acrobat-reader&logoColor=white)</a> -->
[![Aaron Hanson's email](https://img.shields.io/badge/aaron.hanson.brb@gmail.com-f4b400?style=flat-square&logo=gmail&logoColor=black&link=mailto:aaron.hanson.brb@gmail.com)](mailto:aaron.hanson.brb@gmail.com)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077b5?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/aaron-hanson-brb/)](https://www.linkedin.com/in/aaron-hanson-brb/)
[![GitHub ahan8927](https://img.shields.io/github/followers/ahan8927?label=follow&style=social)](https://github.com/ahan8927)
