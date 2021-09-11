module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    sessionSecret: process.env.SESSION_SECRET,
    db: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      // gitClient: process.env.CLIENTID,
      // gitSecret: process.env.GITSECRET
    },
    production: {
      use_env_variable: 'DATABASE_URL' ,
    },
  };
