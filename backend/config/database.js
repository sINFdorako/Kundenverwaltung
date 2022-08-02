const path = require('path');

module.exports = ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'postgres'),
            user: env('DATABASE_USERNAME', 'dominik'),
            password: env('DATABASE_PASSWORD', 'dominik3012'),
            schema: env('DATABASE_SCHEMA', 'public'), // Not required
            ssl: false,
        },
        debug: false,
    },
});