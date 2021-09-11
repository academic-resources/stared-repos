// Update with your config settings.

module.exports = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true, // needed for sqlite
		connection: {
			filename: './database/students.db3'
		},
		migrations: {
			directory: './database/migrations'
		},
		seeds: {
			directory: './database/seeds'
		},
		// add the following
		pool: {
			afterCreate: (conn, done) => {
				// runs after a connection is made to the sqlite engine
				conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
			}
		}
	}
};

/*
module.exports = {
	development: {
		client: 'pg',
		connection: 'postgresql://localhost/school',
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './database/migrations',
			tableName: 'knex_migrations'
		}
	},

	testing: {
		client: 'pg',
		connection: 'postgresql://localhost/testing',
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './database/migrations',
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		// connection: "postgres:// username : password @ addressToServer:5432 / databaseName"
		// connection: {
		//   host: 'db.ourcompany.com',
		//   user: 'me',
		//   password: 'mini me',
		//   database: 'school'
		// }
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './database/migrations',
			tableName: 'knex_migrations'
		}
	}
};
*/
