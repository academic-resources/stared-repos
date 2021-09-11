require('dotenv').config();

module.exports = {
	development: {
		client: 'sqlite3',
		connection: { filename: './database/db_school.db3' },
		useNullAsDefault: true,
		migrations: {
			directory: './database/migrations'
		},
		seeds: { directory: './database/seeds' },
		pool: {
			afterCreate: (conn, done) => {
				conn.run('PRAGMA foreign_keys=ON', done);
			}
		}
	},
	test: {
		client: 'sqlite3',
		connection: { filename: './database/test.db3' },
		useNullAsDefault: true,
		migrations: {
			directory: './database/migrations',
			tableName: 'dbmigrations'
		},
		seeds: { directory: './database/seeds' }
	}
};
