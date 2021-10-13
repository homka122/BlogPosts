module.exports = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  ssl: true,
  synchronize: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: ['dist/entities/**/*.js'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
