# æterNote

Welcome to [æterNote](https://aeternote.herokuapp.com/), a single-page clone of [Evernote](https://evernote.com/). æterNote is a web application for creating and organizing rich text formatted notes quickly and easily online.

### Technologies

æterNote uses React, Redux, and ES6 to dynamically generate the frontend, and Ruby on Rails for data management on the backend. No jQuery was used except to generate ajax requests to the Rails backend.

## Features

### User Authentication

Users can securely sign up, log in, and log out simply by setting an email address and password for their account.

![user auth](https://github.com/BCrawfordScott/aeterNote/blob/master/%C3%A6terNote_readme_images%20/session_forms.png)

### Structure

æterNote's main components are as follows:

1. Sidenav

- Main navigation for the application

2. Note Show

- Serves as both the creator and editor of a users notes
- Implemented through [React Quill](https://github.com/zenoamaro/react-quill)

3. Notebooks

- Lists all notebooks
- Shows associated notes

4. Tags

- Lists all tags
- Shows associated notes

### Rich Text Editing

æterNote implements React-Quill, a react component version of the popular Quill.js

![text-editor](https://github.com/BCrawfordScott/aeterNote/blob/master/%C3%A6terNote_readme_images%20/text_editor.png)

The editor serves as both a create and/or an update form for notes. It gives the user the ability to assign and re-assign the current note to notebooks, and assign tags to the current note.

Notebooks are listed via dropdown at the top of the editor. Users can also create a new notebook through the dropdown.

Tags are listed as clickable buttons in a list at the top of the editor.

### Easy UI

React and redux architecture provide a simple and intuitive interface. The UI id present and recognizable throughout the entire application and gives users the ability to navigate to any organizational component from any other organizational component.

![ui-tags](https://github.com/BCrawfordScott/aeterNote/blob/master/%C3%A6terNote_readme_images%20/tag-index.png)
![ui-new-notebook](https://github.com/BCrawfordScott/aeterNote/blob/master/%C3%A6terNote_readme_images%20/create_notebook.png)

#### Future Features

1. Auto-save
2. Image uploading
3. Google maps integration
