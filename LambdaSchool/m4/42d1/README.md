# Node DB 4 Guided Project

Guided project for **Node DB 4** Module.

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.
- a rest client like [Insomnia](https://insomnia.rest/download/) or [Postman](https://www.getpostman.com/downloads/) installed.

## Project Setup

- [ ] **import** and clone this repository.
- [ ] **CD into the folder** where you cloned **your version**.
- [ ] type `npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor uses Knex migrations and seeding to create a multi-table database schema.

## Good Data Model (opinion)

- captures all the data needed by system
- captures only data needed by system
- reflects reality from system's POV
- is flexible, can evolve with system's needs
- guarantees data integrity w/o sacrificing too much performance
- is driven by way we access data

## Components

- entities (resources):  nouns --> tables
- properties (column, fields, attributes) --> columns
- relationships --> foreign keys

## Workflow

- identify entities (resources):  nouns --> tables
- identify relationships --> foreign keys
- identify properties (column, fields, attributes) --> columns

## Relationships

- one to one: rare
- one to many: most common type
- many to many: smoke and mirrors, a trick

## Mantras

- Every table must have primary key
- Work on two or three entities at a time
- One to many relationship requires foreign key
- The foreign key goes on the many side
- Many to many requires a third table
- The third table can have other columns
