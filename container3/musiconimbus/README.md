![musiconimbus_header](https://user-images.githubusercontent.com/70362985/106419949-42a7f780-641f-11eb-8607-26359f76fb68.png)


**MusicoNimbus** is based on **[SoundCloud](https://soundcloud.com/)**, but with a classical music twist.
Logged in users can create, edit, and delete albums, add, edit, or delete songs in those albums (specifying a composer for each piece of music from the available list or adding to the list), and explore albums from other artists on the site.
They can also listen to songs with an audio player that persists across all pages on the site when logged in.

### Try the live site <a href=https://musiconimbus.herokuapp.com/>here</a>. <b>|</b> View the database schema and feature list in the <a href="https://github.com/cellomatt/musiconimbus/wiki">Wiki</a>.



# Tech Stack
MusicoNimbus uses the following tools, frameworks, and key packages:

### [Sequelize](https://sequelize.org/) (with [PostgreSQL](https://www.postgresql.org/))
### [Express.js](https://expressjs.com/)
### [React](https://reactjs.org/)
### [Redux](https://react-redux.js.org/)
### [Node.js](http://nodejs.org/)
### [AWS S3](https://aws.amazon.com/s3/)
### [react-h5-audio-player](https://www.npmjs.com/package/react-h5-audio-player)
### Hosted on [Heroku](https://www.heroku.com)



# Run MusicoNimbus Locally
Follow these instructions to run MusicoNimbus on your local machine. Note: image and song uploads will not work without a valid AWS key and secret.

- Clone the repository at https://github.com/cellomatt/musiconimbus.git
- Open the root folder in your terminal and use ```npm install``` (requires Node.js) to install all dependencies (frontend and backend)
- Make a local ```.env``` file in the ```/backend``` folder using the ```.env.save``` file. Edit to match local configurations. <b>Note that file upload is not supported without valid AWS secret and key. DO NOT expose your AWS credentials on github.</b>
- Create the user and database from your ```.env``` in psql
- Run all migrations with ```npx dotenv sequelize db:migrate```
- Seed all data with ```npx dotenv sequelize db:seed:all```
- In two seperate terminals, ```cd``` into your ```/backend``` folder and your ```/frontend``` folder. Use the script ```npm start``` in each to start the servers. React will launch the site in your browser.
