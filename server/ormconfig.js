module.exports = {
  type: 'postgres',
  host: 'localhost',
  database: 'blogposts',
  password: 'homka',
  synchronize: true,
  entities: ['dist/entities/**/*.js'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
